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

export const findCategories = async (params: GetSearchParams) => {
    const sizes = params.sizes?.split(',').map(Number)
    const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
    const ingredientsIdArr = params.ingredients?.split(',').map(String)
    const priceFrom = Number(params.priceFrom) || DEFAULT_MIN_PRICE
    const priceTo = Number(params.priceTo) || DEFAULT_MAX_PRICE
    const sortBy = Number(params.sortBy) || 1

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
                    id: 'desc',
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
                        orderBy: {
                            price: sortBy === 1 ? 'asc' : 'desc',
                        },
                    },
                    ingredients: true,
                },
            },
        },
    })

    return categories
}
