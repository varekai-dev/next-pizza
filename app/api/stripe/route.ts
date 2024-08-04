import { OrderStatus } from '@prisma/client'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendEmail } from '@/app/action'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const paymentSucceed = async (event: any) => {
    const orderId = event.data.object.metadata?.orderId
    const userCartId = event.data.object.metadata?.userCartId

    try {
        if (!userCartId) {
            return NextResponse.json({ message: 'No Card id' }, { status: 400 })
        }
        if (!orderId) {
            return NextResponse.json({ message: 'No orderId' }, { status: 400 })
        }

        const order = await prisma.order.update({
            where: {
                id: String(orderId),
            },
            data: {
                status: OrderStatus.SUCCEEDED,
                paymentId: event.data.object.id,
            },
        })
        await sendEmail({
            to: order.email,
            subject: 'Order paid',
            html: `<p>Your order is paid. Order id: ${order.id.toString()}</p>`,
        })
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
