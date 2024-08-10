'use client'

import React from 'react'

import { useGetIngredient } from '@/shared/hooks'

import { IngredientForm } from './ingredient-form'

interface Props {
  className?: string
  id: string
}

export const Ingredient: React.FC<Props> = ({ className, id }) => {
  const { ingredient } = useGetIngredient(id)

  return (
    <div className={className}>
      {ingredient && (
        <IngredientForm
          ingredientId={id}
          defaultValues={{
            name: ingredient?.name,
            price: String(ingredient?.price),
            imageUrl: ingredient?.imageUrl,
          }}
        />
      )}
    </div>
  )
}
