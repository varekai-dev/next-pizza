'use client'

import { Ingredient } from '@prisma/client'

import { Api } from '@/shared/services/api-client'

import { useRequest } from './use-request'

interface ReturnProps {
  ingredients: Ingredient[] | undefined
  loading: boolean
}

export const useIngredients = (): ReturnProps => {
  const { data: ingredients, loading } = useRequest<Ingredient[]>(Api.ingredients.getAll)

  return { ingredients, loading }
}
