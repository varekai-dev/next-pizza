'use client'

import { useSet } from 'react-use'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface ReturnProps {
    selectedIngredients: Set<string>
    selectedSizes: Set<string>
    selectedPizzaTypes: Set<string>
    toggleSizes: (id: string) => void
    toggleIngredients: (id: string) => void
    togglePizzaTypes: (id: string) => void
    priceFrom?: number
    priceTo?: number
    setPrice: React.Dispatch<React.SetStateAction<PriceProps>>
}

export interface PriceProps {
    priceFrom?: number
    priceTo?: number
}

type paramType =
    | 'ingredients'
    | 'sizes'
    | 'pizzaTypes'
    | 'priceFrom'
    | 'priceTo'

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<paramType, string>
    const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })

    const [selectedSizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(
            searchParams.get('sizes')
                ? searchParams.get('sizes')?.split(',')
                : []
        )
    )
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(
            searchParams.get('ingredients')
                ? searchParams.get('ingredients')?.split(',')
                : []
        )
    )
    const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(
            searchParams.get('pizzaTypes')
                ? searchParams.get('pizzaTypes')?.split(',')
                : []
        )
    )

    return {
        selectedIngredients,
        toggleIngredients,
        toggleSizes,
        selectedSizes,
        togglePizzaTypes,
        selectedPizzaTypes,
        priceFrom,
        priceTo,
        setPrice,
    }
}
