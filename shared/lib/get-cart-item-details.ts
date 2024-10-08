import { mapPizzaType, PizzaSize, PizzaType } from '../constants'
import { CartStateItem } from './get-cart-details'

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
): string => {
  const details = []

  if (pizzaSize) {
    const typeName = mapPizzaType[pizzaType || 1]
    details.push(`${typeName} ${pizzaSize} cm`)
  }

  if (ingredients && !!ingredients?.length) {
    details.push(...ingredients.map((ingredient) => ingredient.name))
  }

  return details.join(', ')
}
