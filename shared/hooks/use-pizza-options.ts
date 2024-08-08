import React from 'react'
import { useSet } from 'react-use'
import { ProductItem } from '@prisma/client'

import { Variant } from '../components/shared/group-variants'
import { PizzaSize, PizzaType } from '../constants'
import { getAvailablePizzaSizes } from '../lib'

interface ReturnProps {
  size: PizzaSize
  setSize: React.Dispatch<React.SetStateAction<PizzaSize>>
  type: PizzaType
  selectedIngredients: Set<string>
  setType: React.Dispatch<React.SetStateAction<PizzaType>>
  availablePizzaSizes: Variant[]
  addIngredient: (id: string) => void
  currentItemId?: string
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20)
  const [type, setType] = React.useState<PizzaType>(1)

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<string>([]))

  const availablePizzaSizes = getAvailablePizzaSizes(items, type)

  React.useEffect(() => {
    const isAvailableCurrentSize = availablePizzaSizes.find((item) => Number(item.value) === size && !item.disabled)
    const availablePizzas = availablePizzaSizes.find((item) => !item.disabled)

    if (!isAvailableCurrentSize && availablePizzas) {
      setSize(Number(availablePizzas.value) as PizzaSize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const currentItemId = items.find((item) => item.size === size && item.pizzaType === type)?.id

  return {
    size,
    setSize,
    type,
    setType,
    availablePizzaSizes,
    selectedIngredients,
    addIngredient,
    currentItemId,
  }
}
