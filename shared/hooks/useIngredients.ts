'use client'

import { Api } from '@/shared/services/api-client'
import { useRequest } from './useRequest'
import { Ingredient } from '@prisma/client'

interface ReturnProps {
    ingredients: Ingredient[] | undefined
    loading: boolean
}

export const useIngredients = (): ReturnProps => {
    const { data: ingredients, loading } = useRequest<Ingredient[]>(
        Api.ingredients.getAll
    )

    return { ingredients, loading }
}
