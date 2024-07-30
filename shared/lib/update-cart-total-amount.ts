import { prisma } from '@/prisma/prisma-client'
import { calcCartItemTotalPrice } from './calc-cart-item-total-price'
import { NextResponse } from 'next/server'

export const updateCartTotalAmount = async (token: string) => {
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
            token,
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
