'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'
import { CategoryParams } from '../services/categories'

export const useGetCategories = ({ params }: { params: CategoryParams }) => {
  const { data: categories, ...rest } = useQuery({
    queryKey: [QueryKey.GET_CATEGORIES],
    queryFn: () => Api.categories.getAll({ params }),
  })
  return { categories, ...rest }
}
