import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useGetIngredients = () => {
  const { data: ingredients, ...rest } = useQuery({
    queryKey: [QueryKey.GET_INGREDIENTS],
    queryFn: Api.ingredients.getAll,
  })

  return { ingredients, ...rest }
}
