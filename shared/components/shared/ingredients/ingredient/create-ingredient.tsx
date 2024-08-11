'use client'

import React from 'react'

import { useCreateIngredient } from '@/shared/hooks'

import { IngredientForm } from './ingredient-form'

interface Props {
  className?: string
}

export const CreateIngredient: React.FC<Props> = ({ className }) => {
  const { createIngredient, isPending } = useCreateIngredient()

  const handleSubmit = (data: FormData) => {
    createIngredient({
      payload: data,
    })
  }

  return (
    <div className={className}>
      <IngredientForm isPending={isPending} handleSubmit={handleSubmit} empty />
    </div>
  )
}
