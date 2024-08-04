import { ProductWithRelations } from '@/@types/prisma'
import { CartItem, Ingredient, ProductItem } from '@prisma/client'
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
            description: string
        }
        unit_amount: number
    }
    quantity: number
}

export const getStripeItems = (
    items: CartItemWithRelations[]
): StripeItem[] => {
    return items.map(item => ({
        price_data: {
            currency: 'uah',
            product_data: {
                name: item.productItem.product.name,
                images: [
                    `${process.env.FRONTEND_URL}${item.productItem.product.imageUrl}`,
                ],
                description: getCartItemDetails(
                    item.ingredients,
                    item.productItem.pizzaType as PizzaType,
                    item.productItem.size as PizzaSize
                ),
            },
            unit_amount:
                (item.productItem.price +
                    item.ingredients.reduce((acc, ingredient) => {
                        return acc + ingredient.price
                    }, 0)) *
                100,
        },
        quantity: item.quantity,
    }))
}
