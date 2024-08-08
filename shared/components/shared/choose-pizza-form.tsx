'use client'

import React from 'react'
import { Ingredient, ProductItem } from '@prisma/client'

import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants'
import { usePizzaOptions } from '@/shared/hooks'
import { getPizzaDetails } from '@/shared/lib/get-pizza-details'
import { cn } from '@/shared/lib/utils'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'

import { Button } from '../ui'
import { GroupVariants } from './group-variants'
import { IngredientItem } from './ingredient-item'
import { ProductImage } from './product-image'
import { Title } from './title'

interface Props {
  imageUrl: string
  name: string
  className?: string
  ingredients: Ingredient[]
  items: ProductItem[]
  onClickAdd?: (values: CreateCartItemValues) => void
  loading?: boolean
  isDrawer: boolean
  productPage: boolean
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
  loading,
  isDrawer,
  productPage,
}) => {
  const { size, type, availablePizzaSizes, setSize, setType, selectedIngredients, addIngredient, currentItemId } =
    usePizzaOptions(items)

  const { totalPrice, textDetails } = getPizzaDetails({
    size,
    type,
    ingredients,
    items,
    selectedIngredients,
  })

  const handleClickAddCart = () => {
    if (currentItemId) {
      onClickAdd?.({
        productItemId: currentItemId,
        ingredients: Array.from(selectedIngredients),
      })
    }
  }

  return (
    <div
      className={cn('flex flex-1 rounded', className, {
        'flex-col max-h-[70vh] scrollbar overflow-x-auto': isDrawer,
        'lg:flex-row flex-col': productPage,
      })}
    >
      <ProductImage size={size} src={imageUrl} alt={name} productPage={productPage} isDrawer={isDrawer} />
      <div
        className={cn('w-[490px] bg-[#f7f6f5] p-7', {
          'w-full': isDrawer,
          'lg:w-[490px] w-full ': productPage,
        })}
      >
        <Title text={name} />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-4">
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => {
              return (
                <IngredientItem
                  price={ingredient.price}
                  key={ingredient.id}
                  name={ingredient.name}
                  imageUrl={ingredient.imageUrl}
                  active={selectedIngredients.has(ingredient.id)}
                  onClick={() => addIngredient(ingredient.id)}
                />
              )
            })}
          </div>
        </div>
        <span className="sticky bottom-6 sm:block sm:bottom-0 z-10">
          <Button
            loading={loading}
            className={cn('h-[55px] px-10 text-base rounded-[18px] w-full mt-10')}
            onClick={handleClickAddCart}
          >
            Add to Cart {totalPrice} ₴
          </Button>
        </span>
      </div>
    </div>
  )
}
