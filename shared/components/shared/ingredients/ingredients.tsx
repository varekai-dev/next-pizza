'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Ingredient } from '@prisma/client'

import { QueryKey, Route } from '@/@types'
import { useGetIngredients } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Skeleton } from '../../ui'
import { IngredientItem } from '../ingredient-item'

interface Props {
  className?: string
}

export const Ingredients: React.FC<Props> = ({ className }) => {
  const queryClient = useQueryClient()
  const { ingredients, isLoading } = useGetIngredients()
  const router = useRouter()

  const handleClickIngredient = (ingredient: Ingredient) => {
    router.push(`${Route.INGREDIENTS}/${ingredient.id}`)
    queryClient.setQueryData([QueryKey.GET_INGREDIENT, ingredient.id], () => ingredient)
  }
  return (
    <div className={cn('flex gap-3 flex-wrap', className)}>
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-[150px] h-[200px] bg-gray-200" />
          ))
        : ingredients?.map((ingredient) => (
            <IngredientItem
              key={ingredient.id}
              className="w-[150px] h-[200px]"
              imageUrl={ingredient.imageUrl}
              name={ingredient.name}
              price={ingredient.price}
              onClick={() => handleClickIngredient(ingredient)}
            />
          ))}
    </div>
  )
}
