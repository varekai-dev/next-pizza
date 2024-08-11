'use client'

import React from 'react'

import { useGetIngredient, useUpdateIngredient } from '@/shared/hooks'

import { IngredientForm } from './ingredient-form'

interface Props {
  className?: string
  id: string
}

export const Ingredient: React.FC<Props> = ({ className, id }) => {
  const { ingredient } = useGetIngredient(id)
  const { updateIngredient, isPending } = useUpdateIngredient()

  const handleSubmit = (data: FormData) => {
    updateIngredient({
      id: id,
      payload: data,
    })
  }

  return (
    <div className={className}>
      {ingredient && (
        <IngredientForm
          isPending={isPending}
          handleSubmit={handleSubmit}
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
