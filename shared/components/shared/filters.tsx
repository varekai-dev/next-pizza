'use client'

import React from 'react'
import { CircleX } from 'lucide-react'

import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE, pizzaSizesOptions, pizzaTypesItems } from '@/shared/constants'
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'
import { PriceProps } from '@/shared/hooks/use-filters'
import { cn } from '@/shared/lib'
import { GetSearchParams } from '@/shared/services/categories'

import { Button, Input } from '../ui'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { RangeSlider } from './range-slider'
import { SortPopup } from './sort-popup'
import { Title } from './title'

interface Props {
  className?: string
  activeFiltersCount?: number
  searchParams?: GetSearchParams
}

export const Filters: React.FC<Props> = ({ className, activeFiltersCount, searchParams }) => {
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
    clearFilters,
  } = useFilters()

  const { ingredients, loading } = useIngredients()

  const items = ingredients?.map((ingredient) => ({
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
    <div className={cn('relative', className)}>
      <Title text="Filters" size="sm" className="mb-2 font-bold" />
      <div className="block lg:hidden">
        <SortPopup searchParams={searchParams} />
      </div>
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
          items={pizzaSizesOptions}
          onClickCheckbox={toggleSizes}
          selectedValues={selectedSizes}
        />
      </div>
      {/* Price range */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="mb-3 font-bold">Price from and to:</p>
        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={DEFAULT_MIN_PRICE}
            step={10}
            max={DEFAULT_MAX_PRICE}
            value={String(priceFrom ?? 0)}
            onChange={(e) => updatePrice('priceFrom', +e.target.value > 1000 ? 1000 : +e.target.value)}
          />
          <Input
            type="number"
            placeholder="500"
            min={50}
            max={DEFAULT_MAX_PRICE}
            step={10}
            value={String(priceTo ?? DEFAULT_MAX_PRICE)}
            onChange={(e) => updatePrice('priceTo', +e.target.value > 1000 ? 1000 : +e.target.value)}
          />
        </div>
        <RangeSlider
          min={DEFAULT_MIN_PRICE}
          max={DEFAULT_MAX_PRICE}
          step={10}
          value={[priceFrom || DEFAULT_MIN_PRICE, priceTo || DEFAULT_MAX_PRICE]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
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
      {!!activeFiltersCount && activeFiltersCount > 0 && (
        <div className="fixed bottom-2 right-2">
          <Button variant="link" className="flex items-center gap-2" onClick={clearFilters}>
            Clear all
            <CircleX />
          </Button>
        </div>
      )}
    </div>
  )
}
