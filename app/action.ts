'use server'

import { prisma } from '@/prisma/prisma-client'
import { CheckoutFormValues } from '@/shared/components/shared'
import { getStripeItems } from '@/shared/lib'
import {
    CartItemWithRelations,
    StripeItem,
} from '@/shared/lib/get-stripe-items'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function stripeOrder({
    lineItems,
    metadata,
}: {
    lineItems: StripeItem[]
    metadata: Record<string, string>
}): Promise<string | null> {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        currency: 'uah',
        line_items: lineItems,
        metadata,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/checkout?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout?canceled=true`,
    })

    return session.url
}

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies()
        const cartToken = cookieStore.get('cartToken')?.value

        if (!cartToken) {
            throw new Error('Cart token not found')
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        })
        if (!userCart) {
            throw new Error('Cart not found')
        }

        if (userCart.totalAmount === 0) {
            throw new Error('Cart is empty')
        }

        const order = await prisma.order.create({
            data: {
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                token: cartToken,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        })

        const lineItems = getStripeItems(
            userCart.items as CartItemWithRelations[]
        )

        const url = await stripeOrder({
            lineItems,
            metadata: {
                orderId: order.id,
                userCartId: userCart.id,
            },
        })

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        })

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        })

        return url
    } catch (error) {
        console.log(error)
        throw new Error('Error creating order')
    }
}

type Props = {
    to: string
    subject: string
    html: string
}

export const sendEmail = async ({ to, subject, html }: Props) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        })

        const sendMailPromise = () =>
            new Promise<string>((resolve, reject) => {
                transporter.sendMail(
                    {
                        to,
                        subject,
                        html,
                    },
                    function (err) {
                        if (!err) {
                            resolve('Email sent')
                        } else {
                            reject(err.message)
                        }
                    }
                )
            })
        return await sendMailPromise()
    } catch (error) {
        console.log('error', error)
        throw new Error('Error sending email')
    }
}
