import { Ingredient, ProductItem } from '@prisma/client'
import { mapPizzaType, PizzaSize, PizzaType } from '../constants'
import { calcTotalPizzaPrice } from './calc-total-pizza-price'

type ReturnProps = {
    totalPrice: number
    textDetails: string
}

export const getPizzaDetails = ({
    size,
    type,
    ingredients,
    items,
    selectedIngredients,
}: {
    size: PizzaSize
    type: PizzaType
    ingredients: Ingredient[]
    items: ProductItem[]
    selectedIngredients: Set<number>
}): ReturnProps => {
    const totalPrice = calcTotalPizzaPrice({
        items,
        type,
        size,
        ingredients,
        selectedIngredients,
    })
    const textDetails = `${size} cm, ${mapPizzaType[type]} pizza`
    return { totalPrice, textDetails }
}
