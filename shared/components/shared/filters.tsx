'use client'

import React from 'react'
import { Title } from './title'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import {
    useBreakpoint,
    useFilters,
    useIngredients,
    useQueryFilters,
} from '@/shared/hooks'
import { PriceProps } from '@/shared/hooks/use-filters'
import { pizzaTypesItems, pizzaSizesOptions } from '@/shared/constants'
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/shared/lib/find-pizzas'
import { SortPopup } from './sort-popup'

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
    const isLg = useBreakpoint('lg')
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
        sortBy,
        searchParams,
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
    useQueryFilters({
        priceFrom,
        priceTo,
        selectedIngredients,
        selectedSizes,
        selectedPizzaTypes,
        sortBy,
    })
    return (
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-2 font-bold" />
            {/* Upper checkboxes */}
            {!isLg && <SortPopup searchParams={searchParams as any} />}

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
                    items={pizzaSizesOptions}
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
                        min={DEFAULT_MIN_PRICE}
                        step={10}
                        max={DEFAULT_MAX_PRICE}
                        value={String(priceFrom || 0)}
                        onChange={e =>
                            updatePrice('priceFrom', +e.target.value)
                        }
                    />
                    <Input
                        type="number"
                        placeholder="500"
                        min={50}
                        max={DEFAULT_MAX_PRICE}
                        step={10}
                        value={String(priceTo || DEFAULT_MAX_PRICE)}
                        onChange={e => updatePrice('priceTo', +e.target.value)}
                    />
                </div>
                <RangeSlider
                    min={DEFAULT_MIN_PRICE}
                    max={DEFAULT_MAX_PRICE}
                    step={10}
                    value={[
                        priceFrom || DEFAULT_MIN_PRICE,
                        priceTo || DEFAULT_MAX_PRICE,
                    ]}
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
