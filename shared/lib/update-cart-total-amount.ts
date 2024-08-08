import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'

import { calcCartItemTotalPrice } from './calc-cart-item-total-price'

export const updateCartTotalAmount = async (token: string, userId?: string) => {
  const userCart = await prisma.cart.findFirst({
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
    where: {
      OR: [
        {
          userId,
        },
        { token },
      ],
    },
  })

  if (!userCart) {
    return NextResponse.json({ totalAmount: 0, items: [] })
  }

  const totalAmount = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item)
  }, 0)

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  })
}
