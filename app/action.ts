'use server'

import { prisma } from '@/prisma/prisma-client'
import { CheckoutFormValues } from '@/shared/components/shared'
import { OrderStatus } from '@prisma/client'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const token = '11111'

export async function createOrder(data: CheckoutFormValues) {
    const order = await prisma.order.create({
        data: {
            fullName: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment,
            token,
            totalAmount: 1000,
            status: OrderStatus.PENDING,
            items: [],
        },
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        currency: 'uah',
        line_items: [
            {
                price_data: {
                    currency: 'uah',
                    product_data: {
                        name: 'Pizza',
                    },
                    unit_amount: order.totalAmount * 100,
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: 'uah',
                    product_data: {
                        name: 'Pizza',
                        images: [
                            'https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.jpg',
                        ],
                        description: 'Comfortable cotton t-shirt',
                    },
                    unit_amount: order.totalAmount * 100,
                },
                quantity: 1,
            },
        ],
        metadata: {
            orderId: order.id,
            token,
        },
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/checkout?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout?canceled=true`,
    })

    return session.url
}
