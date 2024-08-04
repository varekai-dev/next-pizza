'use server'

import { prisma } from '@/prisma/prisma-client'
import { CheckoutFormValues } from '@/shared/components/shared'
import { getStripeItems } from '@/shared/lib'
import { CartItemWithRelations } from '@/shared/lib/get-stripe-items'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies()
        const cartToken = cookieStore.get('cartToken')?.value

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
        const order = await prisma.order.create({
            data: {
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                token: cartToken!,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: userCart.items,
            },
        })

        const lineItems = getStripeItems(
            userCart.items as CartItemWithRelations[]
        )

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            currency: 'uah',
            line_items: lineItems,
            metadata: {
                orderId: order.id,
                userCartId: userCart.id,
            },
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/checkout?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout?canceled=true`,
        })

        return session.url
    } catch (error) {
        console.log(error)
        throw new Error('Error creating order')
    }
}
