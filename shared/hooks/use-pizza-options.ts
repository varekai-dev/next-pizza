import React from 'react'
import { PizzaSize, PizzaType } from '../constants'
import { getAvailablePizzaSizes } from '../lib'
import { ProductItem } from '@prisma/client'
import { Variant } from '../components/shared/group-variants'
import { useSet } from 'react-use'

interface ReturnProps {
    size: PizzaSize
    setSize: React.Dispatch<React.SetStateAction<PizzaSize>>
    type: PizzaType
    selectedIngredients: Set<number>
    setType: React.Dispatch<React.SetStateAction<PizzaType>>
    availablePizzaSizes: Variant[]
    addIngredient: (id: number) => void
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(20)
    const [type, setType] = React.useState<PizzaType>(1)

    const [selectedIngredients, { toggle: addIngredient }] = useSet(
        new Set<number>([])
    )

    const availablePizzaSizes = getAvailablePizzaSizes(items, type)

    React.useEffect(() => {
        const isAvailableCurrentSize = availablePizzaSizes.find(
            item => Number(item.value) === size && !item.disabled
        )
        const availablePizzas = availablePizzaSizes.find(item => !item.disabled)

        if (!isAvailableCurrentSize && availablePizzas) {
            setSize(Number(availablePizzas.value) as PizzaSize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    return {
        size,
        setSize,
        type,
        setType,
        availablePizzaSizes,
        selectedIngredients,
        addIngredient,
    }
}