'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Ingredient } from '@prisma/client'

import { QueryKey, Route } from '@/@types'
import { useDeleteIngredient, useGetIngredients } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button, Skeleton } from '../../ui'
import { AddButton } from '../add-button'
import { IngredientItem } from '../ingredient-item'

interface Props {
  className?: string
}

export const Ingredients: React.FC<Props> = ({ className }) => {
  const queryClient = useQueryClient()
  const { ingredients, isLoading } = useGetIngredients()
  const { deleteIngredient, isPending } = useDeleteIngredient()
  const router = useRouter()

  const handleClickIngredient = (ingredient: Ingredient) => {
    router.push(`${Route.INGREDIENTS}/${ingredient.id}`)
    queryClient.setQueryData([QueryKey.GET_INGREDIENT, ingredient.id], () => ingredient)
  }

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {isLoading || isPending ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-[150px] bg-gray-200" />
        ))
      ) : (
        <>
          {ingredients?.map((ingredient) => (
            <IngredientItem
              key={ingredient.id}
              className="h-[200px] w-[150px]"
              imageUrl={ingredient.imageUrl}
              name={ingredient.name}
              price={ingredient.price}
              onDelete={() => deleteIngredient(ingredient.id)}
              onClick={() => handleClickIngredient(ingredient)}
            />
          ))}
          <div className="flex h-[200px] w-[150px] items-center justify-center">
            <Button
              variant="link"
              size="lg"
              className="text-lg text-gray-500"
              onClick={() => router.push(Route.CREATE_INGREDIENT)}
            >
              <AddButton />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
