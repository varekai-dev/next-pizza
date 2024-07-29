export const mapPizzaSize = {
    20: 'Small',
    30: 'Medium',
    40: 'Large',
} as const

export const mapPizzaType = {
    1: 'Traditional',
    2: 'Thin',
} as const

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
    value,
    name,
}))

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
    value,
    name,
}))

export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType
