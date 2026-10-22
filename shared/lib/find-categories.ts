import { Prisma } from '@prisma/client'

import { Sort } from '@/@types'
import { prisma } from '@/prisma/prisma-client'
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/shared/constants'
import { CategoryWithProducts, GetSearchParams } from '@/shared/services/categories'

// Server-only: shared by the /api/categories route and server components
export const findCategories = async (params: GetSearchParams = {}): Promise<CategoryWithProducts[]> => {
  const sizes = params.sizes?.split(',').map(Number)
  const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
  const ingredientsIdArr = params.ingredients?.split(',').map(String)
  const priceFrom = Number(params.priceFrom) || DEFAULT_MIN_PRICE
  const priceTo = Number(params.priceTo) || DEFAULT_MAX_PRICE
  const sortBy = params.sortBy || Sort.CHEAP
  const getAll = Boolean(params.getAll)

  const categoryParams = {
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
  } satisfies Prisma.CategoryFindManyArgs

  return prisma.category.findMany(categoryParams)
}
