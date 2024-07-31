import { useRouter } from 'next/navigation'
import qs from 'qs'
import React from 'react'

interface Props {
    priceFrom: number | undefined
    priceTo: number | undefined
    selectedPizzaTypes: Set<string>
    selectedSizes: Set<string>
    selectedIngredients: Set<string>
}

export const useQueryFilters = (filters: Props) => {
    const router = useRouter()
    React.useEffect(() => {
        const params = {
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filters.selectedIngredients,
        filters.selectedSizes,
        filters.selectedPizzaTypes,
        filters.priceFrom,
        filters.priceTo,
    ])
}
