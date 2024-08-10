'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useGetIngredient = (id: string) => {
  const { data: ingredient, ...rest } = useQuery({
    queryKey: [QueryKey.GET_INGREDIENT, id],
    queryFn: () => Api.ingredients.getIngredient(id),
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  return { ingredient, ...rest }
}
