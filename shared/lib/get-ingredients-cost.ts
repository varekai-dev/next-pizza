import { CartItemDTO } from '../services/dto/cart.dto'

export const getIngredientsCost = (item: CartItemDTO): number => {
    return item.ingredients.reduce((acc, ingredient) => {
        return acc + ingredient.price
    }, 0)
}
