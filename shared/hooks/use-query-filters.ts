'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import qs from 'qs'

interface Props {
  priceFrom: number | undefined
  priceTo: number | undefined
  selectedPizzaTypes: Set<string>
  selectedSizes: Set<string>
  selectedIngredients: Set<string>
  sortBy?: string
}

export const useQueryFilters = (filters: Props) => {
  const router = useRouter()
  const isMounted = React.useRef(false)

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        sortBy: filters.sortBy,
        priceFrom: filters.priceFrom,
        priceTo: filters.priceTo,
        pizzaTypes: Array.from(filters.selectedPizzaTypes),
        sizes: Array.from(filters.selectedSizes),
        ingredients: Array.from(filters.selectedIngredients),
      }

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      })

      router.push(`?${query}`, { scroll: false })
    }
    isMounted.current = true

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.selectedIngredients,
    filters.selectedSizes,
    filters.selectedPizzaTypes,
    filters.priceFrom,
    filters.priceTo,
    filters.sortBy,
  ])
}
