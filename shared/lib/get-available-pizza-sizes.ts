import { ProductItem } from '@prisma/client'

import { Variant } from '../components/shared/group-variants'
import { pizzaSizes, PizzaType } from '../constants'

export const getAvailablePizzaSizes = (items: ProductItem[], type: PizzaType): Variant[] => {
  const availablePizzas = items.reduce((acc, item) => {
    if (item.pizzaType === type && item.size && !acc.includes(item.size)) {
      acc.push(item.size)
    }
    return acc
  }, [] as number[])

  const availablePizzaSizes = pizzaSizes.map((pizzaSize) => ({
    ...pizzaSize,
    disabled: !availablePizzas.includes(Number(pizzaSize.value)),
  }))

  return availablePizzaSizes
}
