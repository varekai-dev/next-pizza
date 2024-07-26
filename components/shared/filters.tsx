'use client'

import React from 'react'
import { Title } from './title'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { useFilters, useIngredients } from '@/hooks'
import qs from 'qs'
import { useRouter } from 'next/navigation'
import { PriceProps } from '@/hooks/useFilters'
import { pizzaTypesItems, sizesItems } from '@/constants'

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
    const router = useRouter()

    const {
        selectedIngredients,
        selectedSizes,
        selectedPizzaTypes,
        toggleIngredients,
        toggleSizes,
        togglePizzaTypes,
        priceFrom,
        priceTo,
        setPrice,
    } = useFilters()

    const { ingredients, loading } = useIngredients()

    const items = ingredients?.map(ingredient => ({
        value: String(ingredient.id),
        text: ingredient.name,
    }))

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            priceFrom,
            priceTo,
            [name]: value,
        })
    }

    React.useEffect(() => {
        const filters = {
            priceFrom,
            priceTo,
            pizzaTypes: Array.from(selectedPizzaTypes),
            sizes: Array.from(selectedSizes),
            ingredients: Array.from(selectedIngredients),
        }

        const query = qs.stringify(filters, {
            arrayFormat: 'comma',
        })

        router.push(`?${query}`, { scroll: false })
    }, [
        selectedIngredients,
        selectedSizes,
        selectedPizzaTypes,
        priceFrom,
        priceTo,
        router,
    ])
    return (
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-2 font-bold" />
            {/* Upper checkboxes */}

            <div className="flex flex-col gap-4">
                <CheckboxFiltersGroup
                    name="pizzaTypes"
                    className="mt-5"
                    title="Pizza types"
                    items={pizzaTypesItems}
                    onClickCheckbox={togglePizzaTypes}
                    selectedValues={selectedPizzaTypes}
                />
                <CheckboxFiltersGroup
                    name="sizes"
                    className="mt-5"
                    title="Sizes"
                    items={sizesItems}
                    onClickCheckbox={toggleSizes}
                    selectedValues={selectedSizes}
                />
            </div>
            {/* Price range */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price from and to:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        step={10}
                        max={500}
                        value={String(priceFrom || 0)}
                        onChange={e =>
                            updatePrice('priceFrom', +e.target.value)
                        }
                    />
                    <Input
                        type="number"
                        placeholder="500"
                        min={50}
                        max={500}
                        step={10}
                        value={String(priceTo || 500)}
                        onChange={e => updatePrice('priceTo', +e.target.value)}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={500}
                    step={10}
                    value={[priceFrom || 0, priceTo || 500]}
                    onValueChange={([priceFrom, priceTo]) =>
                        setPrice({ priceFrom, priceTo })
                    }
                />
            </div>
            <CheckboxFiltersGroup
                name="ingredients"
                className="mt-5"
                title="Ingredients"
                limit={6}
                items={items}
                loading={loading}
                onClickCheckbox={toggleIngredients}
                selectedValues={selectedIngredients}
                sortSelectedFirst
            />
        </div>
    )
}
