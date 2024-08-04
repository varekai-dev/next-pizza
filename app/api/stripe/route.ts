import { OrderStatus } from '@prisma/client'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const paymentSucceed = async (event: any) => {
    const orderId = event.data.object.metadata?.orderId
    const token = event.data.object.metadata?.token

    try {
        if (token) {
            const cart = await prisma.cart.findFirst({
                where: {
                    token,
                },
            })
            await prisma.cart.deleteMany({
                where: {
                    token,
                },
            })
            await prisma.cartItem.deleteMany({
                where: {
                    cartId: cart?.id,
                },
            })
        } else {
            return NextResponse.json({ message: 'No token' }, { status: 400 })
        }

        if (orderId) {
            await prisma.order.update({
                where: {
                    id: Number(orderId),
                },
                data: {
                    status: OrderStatus.SUCCEEDED,
                },
            })
        } else {
            return NextResponse.json({ message: 'No orderId' }, { status: 400 })
        }
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({ message: 'Error' }, { status: 400 })
    }
}

export async function POST(req: NextRequest) {
    const sig = req.headers.get('stripe-signature')
    const payload = await req.text()
    let event
    try {
        event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            String(process.env.STRIPE_WEBHOOK_SECRET)
        )
    } catch (err) {
        console.log('error', err)
        return NextResponse.json({ message: 'Webhook error' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            await paymentSucceed(event)
            // Then define and call a function to handle the event payment_intent.succeeded
            break
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event

    return NextResponse.json({ received: true })
}
