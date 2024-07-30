import { prisma } from '@/prisma/prisma-client'
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id)
        const data = (await req.json()) as { quantity: number }
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json(
                { message: 'Cart not found' },
                { status: 404 }
            )
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            },
        })

        if (!cartItem) {
            return NextResponse.json(
                { message: 'Cart item not found' },
                { status: 404 }
            )
        }

        await prisma.cartItem.update({
            where: {
                id,
            },
            data: {
                quantity: data.quantity,
            },
        })

        const updatedUserCart = await updateCartTotalAmount(token)
        return NextResponse.json(updatedUserCart)
    } catch (error) {
        console.log('[CART_PATCH] Server error', error)
        return NextResponse.json(
            { message: 'Cart could not be updated' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = req.cookies.get('cartToken')?.value
        const id = Number(params.id)
        if (!token) {
            return NextResponse.json(
                { message: 'Cart not found' },
                { status: 404 }
            )
        }
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            },
        })

        if (!cartItem) {
            return NextResponse.json(
                { message: 'Cart item not found' },
                { status: 404 }
            )
        }

        await prisma.cartItem.delete({
            where: {
                id,
            },
        })

        const updatedUserCart = await updateCartTotalAmount(token)

        return NextResponse.json(updatedUserCart)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Cart could not be deleted' },
            { status: 500 }
        )
    }
}
