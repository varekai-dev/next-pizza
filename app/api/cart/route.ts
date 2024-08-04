import { prisma } from '@/prisma/prisma-client'
import { findOrCreateCart } from '@/shared/lib'
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import isEqual from 'react-fast-compare'

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] })
        }

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

        return NextResponse.json(userCart)
    } catch (error) {
        console.log('[CART_GET] Server error', error)
        return NextResponse.json(
            {
                message: 'Server error',
            },
            {
                status: 500,
            }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value

        if (!token) {
            token = crypto.randomUUID()
        }

        const userCart = await findOrCreateCart(token)

        const data = (await req.json()) as CreateCartItemValues

        const sortedIngredients = data.ingredients?.sort() ?? []

        const findCartItems = await prisma.cartItem.findMany({
            include: {
                ingredients: {
                    orderBy: {
                        id: 'asc',
                    },
                },
            },
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
            },
        })

        const findCartItem = findCartItems.find(item =>
            isEqual(
                item.ingredients.map(ingredient => ingredient.id),
                sortedIngredients
            )
        )
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                },
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: {
                        connect: data.ingredients?.map(id => ({
                            id: String(id),
                        })),
                    },
                },
            })
        }

        const updatedUserCart = await updateCartTotalAmount(token)

        const resp = NextResponse.json(updatedUserCart)
        resp.cookies.set('cartToken', token)
        return resp
    } catch (error) {
        console.log('[CART_POST] Server error', error)
        return NextResponse.json(
            {
                message: 'Cart could not be created',
            },
            {
                status: 500,
            }
        )
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] })
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token,
            },
        })

        if (userCart) {
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
        } else {
            return NextResponse.json(
                {
                    message: 'Cart not found',
                },
                { status: 404 }
            )
        }
        return NextResponse.json({ totalAmount: 0, items: [] })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
        } else {
            console.log('[CART_DELETE] Server error', error)
        }

        return NextResponse.json(
            {
                message: 'Cart could not be deleted',
            },
            {
                status: 500,
            }
        )
    }
}
