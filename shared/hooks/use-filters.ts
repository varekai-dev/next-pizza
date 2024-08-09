'use client'

import React from 'react'
import { useSet } from 'react-use'
import { useSearchParams } from 'next/navigation'

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
  sortBy?: string
  searchParams: Map<paramType, string>
  clearFilters: () => void
}

export interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

type paramType = 'ingredients' | 'sizes' | 'pizzaTypes' | 'priceFrom' | 'priceTo' | 'sortBy'

export type SearchParams = Map<paramType, string>

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<paramType, string>
  const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  })

  const [selectedSizes, { toggle: toggleSizes, clear: clearSelectedSizes }] = useSet(
    new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []),
  )
  const [selectedIngredients, { toggle: toggleIngredients, clear: clearIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients') ? searchParams.get('ingredients')?.split(',') : []),
  )
  const [selectedPizzaTypes, { toggle: togglePizzaTypes, clear: clearPizzaSizes }] = useSet(
    new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []),
  )

  const sortBy = searchParams.get('sortBy') || undefined

  const clearFilters = () => {
    clearSelectedSizes()
    clearIngredients()
    clearPizzaSizes()
    setPrice({})
  }

  return {
    toggleIngredients,
    toggleSizes,
    togglePizzaTypes,
    setPrice,
    selectedSizes,
    selectedIngredients,
    selectedPizzaTypes,
    priceFrom,
    priceTo,
    sortBy,
    searchParams,
    clearFilters,
  }
}
