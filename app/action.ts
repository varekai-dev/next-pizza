'use server'

import { cookies } from 'next/headers'
import { OrderStatus, Prisma } from '@prisma/client'
import Stripe from 'stripe'
import { hashSync } from 'bcrypt'
import nodemailer from 'nodemailer'

import { UploadFileResult } from 'uploadthing/types'

import { prisma } from '@/prisma/prisma-client'
import { CheckoutFormValues } from '@/shared/components/shared'
import { generateRandomCode, getStripeItems, sendConfirmationCode } from '@/shared/lib'
import { CartItemWithRelations, StripeItem } from '@/shared/lib/get-stripe-items'
import { getUserSession } from '@/shared/lib/get-user-session'
import { utapi } from '@/shared/services/uploadthing'

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
    success_url: `${process.env.FRONTEND_URL}?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}`,
  })

  return session.url
}

export async function createOrder(data: CheckoutFormValues) {
  try {
    const currentUser = await getUserSession()
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
        OR: [
          {
            userId: currentUser?.id,
          },
          {
            token: cartToken,
          },
        ],
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
        userId: currentUser?.id,
        fullName: data.fullName,
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

    const lineItems = getStripeItems(userCart.items as CartItemWithRelations[])

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

type SendEmailProps = {
  to: string
  subject: string
  html: string
}

export const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
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
          },
        )
      })
    return await sendMailPromise()
  } catch (error) {
    console.log('error', error)
    throw new Error('Error sending email')
  }
}

export const updateUserInfo = async (body: Partial<Prisma.UserCreateInput>) => {
  try {
    const currentUser = await getUserSession()
    if (!currentUser) {
      throw new Error('User not found')
    }

    if (body.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      })
      if (emailExists && emailExists.id !== currentUser.id) {
        throw new Error('Email already exists')
      }
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        ...body,
        ...(body.password && { password: hashSync(body.password, 10) }),
      },
    })
  } catch (error) {
    console.log('Error [UPDATE_USER]', error)
    throw error
  }
}

export const registerUser = async (body: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (user) {
      if (!user.verified) {
        throw new Error('Email not verified')
      }

      throw new Error('User already exists')
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
        password: hashSync(body.password, 10),
      },
    })

    const code = generateRandomCode()

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    })

    await sendConfirmationCode(createdUser.email, code)
  } catch (error) {
    console.log('Error [REGISTER]', error)
    throw error
  }
}

export const requestVerificationCode = async (email: string) => {
  try {
    const code = generateRandomCode()

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      return
    }

    await prisma.verificationCode.update({
      where: {
        userId: user.id,
      },
      data: {
        code,
      },
    })
    await sendConfirmationCode(email, code)
  } catch (error) {
    console.log('Error [REQUEST_VERIFICATION_CODE]', error)
    throw error
  }
}

export const uploadImage = async (file: File): Promise<UploadFileResult> => {
  try {
    const response = await utapi.uploadFiles(file)

    if (!response?.data?.url) {
      throw new Error('Upload failed')
    }
    return response
  } catch (error) {
    console.log('Error [UPLOAD_IMAGE]', error)
    throw error
  }
}
