import { Ingredient, ProductItem } from '@prisma/client'

import { PizzaSize, PizzaType } from '../constants'

/**
 * Function to calculate total price of pizza
 *
 * @example ```calcTotalPizzaPrice({1,20, items, ingredients, selectedIngredients})```
 *
 * @param type - pizza type
 * @param size - pizza size
 * @param ingredients - list of ingredients
 * @param selectedIngredients - set of selected ingredients
 * @param items - list of product items
 *
 * @returns number total price of pizza
 */
export const calcTotalPizzaPrice = ({
  items,
  type,
  size,
  ingredients,
  selectedIngredients,
}: {
  items: ProductItem[]
  type: PizzaType
  ingredients: Ingredient[]
  size: PizzaSize
  selectedIngredients: Set<string>
}) => {
  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0

  const totalIngredientsPrice = ingredients.reduce((acc, ingredient) => {
    if (selectedIngredients.has(ingredient.id)) {
      return acc + ingredient.price
    }
    return acc
  }, 0)

  const totalPrice = pizzaPrice + totalIngredientsPrice

  return totalPrice
}
