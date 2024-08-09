import { Category } from '@prisma/client'

import { Sort } from '@/@types'
import { ProductWithRelations } from '@/@types/prisma'
import { prisma } from '@/prisma/prisma-client'

export interface GetSearchParams {
  query?: string
  sortBy?: string
  sizes?: string
  pizzaTypes?: string
  ingredients?: string
  priceFrom?: string
  priceTo?: string
}

export const DEFAULT_MIN_PRICE = 0
export const DEFAULT_MAX_PRICE = 1000

type CategoriesWithProducts = (Category & {
  products: ProductWithRelations[]
})[]

export const findCategories = async (params: GetSearchParams): Promise<CategoriesWithProducts> => {
  const sizes = params.sizes?.split(',').map(Number)
  const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
  const ingredientsIdArr = params.ingredients?.split(',').map(String)
  const priceFrom = Number(params.priceFrom) || DEFAULT_MIN_PRICE
  const priceTo = Number(params.priceTo) || DEFAULT_MAX_PRICE
  const sortBy = params.sortBy || Sort.CHEAP

  const categories = await prisma.category.findMany({
    where: {
      products: {
        some: {},
      },
    },
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
                gte: priceFrom,
                lte: priceTo,
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
                gte: priceFrom,
                lte: priceTo,
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
  })

  return categories
}
