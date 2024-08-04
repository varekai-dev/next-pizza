import { OrderStatus } from '@prisma/client'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const paymentSucceed = async (event: any) => {
    console.log('orderId', event.metadata?.orderId)

    const orderId = event.metadata?.orderId
    const token = event.metadata?.token

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
    }

    if (orderId) {
        await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: OrderStatus.SUCCEEDED,
            },
        })
    } else {
        return NextResponse.json({ message: 'No orderId' }, { status: 400 })
    }
}

export async function POST(req: NextRequest) {
    const sig = req.headers.get('stripe-signature')
    const payload = await req.text()
    let event
    try {
        event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        console.log('error', err)
        return NextResponse.json({ message: 'Webhook error' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            console.log('PaymentIntent was successful!')

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
