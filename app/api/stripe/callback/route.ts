import { OrderStatus } from '@prisma/client'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendEmail } from '@/app/action'
import { CartItemDTO } from '@/shared/services/dto/cart.dto'
import { getItemPrice } from '@/shared/lib'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const paymentSucceed = async (event: any) => {
    const orderId = event.data.object.metadata?.orderId
    try {
        if (!orderId) {
            return NextResponse.json({ message: 'No orderId' }, { status: 400 })
        }

        const order = await prisma.order.update({
            where: {
                id: String(orderId),
            },
            data: {
                status: OrderStatus.SUCCEEDED,
                paymentId: event.id,
            },
        })

        const orderItems: CartItemDTO[] = JSON.parse(order.items as string)

        await sendEmail({
            to: order.email,
            subject: 'Order paid',
            html: `<p>Your order is paid. Order id: ${order.id.toString()}</p>
            <ul>
            ${getItemPrice(orderItems)}
            </ul>`,
        })
    } catch (error) {
        console.log('error', error)
        return NextResponse.json(
            { message: 'paymentSucceed error' },
            { status: 400 }
        )
    }
}

const sessionExpired = (event: any) => {
    try {
        const orderId = event.data.object.metadata?.orderId
        if (!orderId) {
            return NextResponse.json({ message: 'No orderId' }, { status: 400 })
        }
        prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: OrderStatus.CANCELLED,
            },
        })
    } catch (error) {
        console.log('error', error)
        return NextResponse.json(
            { message: 'sessionExpired error' },
            { status: 400 }
        )
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

        case 'checkout.session.expired':
            await sessionExpired(event)
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event

    return NextResponse.json({ received: true })
}
