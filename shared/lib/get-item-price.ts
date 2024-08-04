import { CartItemDTO } from '../services/dto/cart.dto'
import { getIngredientsCost } from './get-ingredients-cost'

export const getItemPrice = (orderItems: CartItemDTO[]): string => {
    return orderItems
        .map(
            item =>
                `<li>${item.productItem.product.name} | ${
                    getIngredientsCost(item) + item.productItem.price
                } ₴ x ${item.quantity} = ${
                    (getIngredientsCost(item) + item.productItem.price) *
                    item.quantity
                }</li>`
        )
        .join('')
}
