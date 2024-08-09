import { NextRequest, NextResponse } from 'next/server'
import { OrderStatus } from '@prisma/client'
import Stripe from 'stripe'

import { sendEmail } from '@/app/action'
import { prisma } from '@/prisma/prisma-client'
import { getItemPrice } from '@/shared/lib'
import { CartItemDTO } from '@/shared/services/dto/cart.dto'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const paymentSucceed = async (event: any) => {
  const orderId = event.data.object.metadata?.orderId
  const paymentId = event.id
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
        paymentId,
      },
    })

    const orderItems: CartItemDTO[] = JSON.parse(order.items as string)

    const productsCount = orderItems.reduce(
      (acc, item) => {
        acc[item.productItem.product.id] = item.quantity
        return acc
      },
      {} as { [key: string]: number },
    )

    const updatePromises = Object.entries(productsCount).map(([id, quantity]) => {
      return prisma.product.update({
        where: {
          id,
        },
        data: {
          orderCount: {
            increment: Number(quantity) || 0,
          },
        },
      })
    })

    await Promise.all(updatePromises)

    await sendEmail({
      to: order.email,
      subject: 'Order paid',
      html: `<h1>Thanks for the order 🥳</h1><p>Your order is paid. Order id: ${paymentId}</p>
            <hr/>
            <ul>
            ${getItemPrice(orderItems)}
            </ul>`,
    })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ message: 'paymentSucceed error' }, { status: 400 })
  }
}

const sessionExpired = async (event: any) => {
  try {
    const orderId = event.data.object.metadata?.orderId
    if (!orderId) {
      return NextResponse.json({ message: 'No orderId' }, { status: 400 })
    }
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: OrderStatus.CANCELLED,
      },
    })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ message: 'sessionExpired error' }, { status: 400 })
  }
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')
  const payload = await req.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(payload, sig!, String(process.env.STRIPE_WEBHOOK_SECRET))
    console.log('event.type', event.type)
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await paymentSucceed(event)
        // Then define and call a function to handle the event payment_intent.succeeded
        break

      case 'checkout.session.expired':
        await sessionExpired(event)
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event

    return NextResponse.json({ received: true })
  } catch (err) {
    console.log('error', err)
    return NextResponse.json({ message: 'Webhook error' }, { status: 400 })
  }
}
