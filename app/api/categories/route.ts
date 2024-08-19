import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

import { Sort } from '@/@types'
import { prisma } from '@/prisma/prisma-client'
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/shared/constants'
import { CheckAuth } from '@/shared/lib/check-auth'

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URLSearchParams(req.nextUrl.searchParams)
    const sizes = searchParams.get('sizes')?.split(',').map(Number)
    const pizzaTypes = searchParams.get('pizzaTypes')?.split(',').map(Number)
    const ingredientsIdArr = searchParams.get('ingredients')?.split(',').map(String)
    const priceFrom = Number(searchParams.get('priceFrom')) || DEFAULT_MIN_PRICE
    const priceTo = Number(searchParams.get('priceTo')) || DEFAULT_MAX_PRICE
    const sortBy = searchParams.get('sortBy') || Sort.CHEAP
    const getAll = Boolean(searchParams.get('getAll'))

    const categoryParams: Prisma.CategoryFindManyArgs = {
      ...(!getAll && {
        where: {
          products: {
            some: {},
          },
        },
      }),
      orderBy: {
        id: 'asc',
      },
      include: {
        products: {
          orderBy: {
            ...(sortBy === Sort.POPULAR
              ? {
                  orderCount: 'desc',
                }
              : {
                  id: 'desc',
                }),
          },
          where: {
            ingredients: ingredientsIdArr
              ? {
                  some: {
                    id: {
                      in: ingredientsIdArr,
                    },
                  },
                }
              : undefined,
            items: {
              some: {
                price: {
                  ['gte']: priceFrom,
                  ['lte']: priceTo,
                },
                size: {
                  in: sizes,
                },
                pizzaType: {
                  in: pizzaTypes,
                },
              },
            },
          },
          include: {
            items: {
              where: {
                price: {
                  ['gte']: priceFrom,
                  ['lte']: priceTo,
                },
              },
              ...(sortBy === Sort.CHEAP && {
                orderBy: {
                  price: 'asc',
                },
              }),
              ...(sortBy === Sort.EXPENSIVE && {
                orderBy: {
                  price: 'desc',
                },
              }),
            },
            ingredients: true,
          },
        },
      },
    }

    const categories = await prisma.category.findMany(categoryParams)
    return NextResponse.json(categories)
  } catch (error) {
    console.log('[INGREDIENTS_GET] Server error', error)
    return NextResponse.json(
      {
        message: 'Server error',
      },
      {
        status: 500,
      },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    CheckAuth('ADMIN')
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json(
        {
          message: 'Name is required',
        },
        {
          status: 400,
        },
      )
    }

    const isCategoryExists = await prisma.category.findFirst({
      where: {
        name,
      },
    })

    if (isCategoryExists) {
      return NextResponse.json(
        {
          message: 'Category already exists',
        },
        {
          status: 400,
        },
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    })

    return NextResponse.json(category, {
      status: 201,
    })
  } catch (error) {
    console.log('[CATEGORIES_POST] Server error', error)
    return NextResponse.json(
      {
        message: 'Server error',
      },
      {
        status: 500,
      },
    )
  }
}
