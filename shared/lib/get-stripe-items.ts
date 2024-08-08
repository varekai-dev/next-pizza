import { CartItem, Ingredient, ProductItem } from '@prisma/client'

import { ProductWithRelations } from '@/@types/prisma'

import { PizzaSize, PizzaType } from '../constants'
import { getCartItemDetails } from './get-cart-item-details'

export type CartItemWithRelations = CartItem & {
  productItem: ProductItem & {
    product: ProductWithRelations
  }
  ingredients: Ingredient[]
}

export type StripeItem = {
  price_data: {
    currency: string
    product_data: {
      name: string
      images?: string[]
      description?: string
    }
    unit_amount: number
  }
  quantity: number
}

export const getStripeItems = (items: CartItemWithRelations[]): StripeItem[] => {
  return items.map((item) => {
    const description = getCartItemDetails(
      item.ingredients,
      item.productItem.pizzaType as PizzaType,
      item.productItem.size as PizzaSize,
    )

    const itemIngredientsExist = item?.ingredients?.length > 0
    const ingredientsPrice = itemIngredientsExist
      ? item?.ingredients?.reduce((acc, ingredient) => {
          return acc + ingredient.price
        }, 0)
      : 0

    const unitPrice = (item.productItem.price + ingredientsPrice) * 100

    return {
      price_data: {
        currency: 'uah',
        product_data: {
          name: item.productItem.product.name,
          images: [`${process.env.FRONTEND_URL}${item.productItem.product.imageUrl}`],
          ...(description
            ? {
                description,
              }
            : {}),
        },
        unit_amount: unitPrice,
      },
      quantity: item.quantity,
    }
  })
}
