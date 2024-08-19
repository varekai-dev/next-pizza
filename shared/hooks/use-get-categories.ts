'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useGetCategories = () => {
  const { data: categories, ...rest } = useQuery({
    queryKey: [QueryKey.GET_CATEGORIES_SETTINGS],
    queryFn: () =>
      Api.categories.getAll({
        params: {
          getAll: true,
        },
      }),
  })
  return { categories, ...rest }
}
