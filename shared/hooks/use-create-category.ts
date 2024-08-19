'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'
import { CategoryWithProducts } from '../services/categories'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const { mutate: createCategory, ...rest } = useMutation({
    mutationFn: Api.categories.createCategory,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.GET_CATEGORIES_SETTINGS], (oldData: CategoryWithProducts[] | undefined) => {
        if (!oldData) {
          return
        }
        return [...oldData, data]
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_CATEGORIES],
      })

      toast.success('Category created successfully')
    },
  })
  return {
    createCategory,
    ...rest,
  }
}
