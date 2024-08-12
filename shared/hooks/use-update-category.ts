'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'
import { CategoryWithProducts } from '../services/categories'

export const useUpdateCategory = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  const { mutate: updateCategory, ...rest } = useMutation({
    mutationFn: Api.categories.updateCategory,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.GET_CATEGORIES_SETTINGS], (oldData: CategoryWithProducts[] | undefined) => {
        if (!oldData) {
          return
        }
        return oldData.map((category) => {
          if (category.id === data.id) {
            return {
              ...category,
              name: data.name,
              items: category.products,
            }
          }
          return category
        })
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_CATEGORIES],
      })
      onSuccess?.()
      toast.success('Category updated successfully')
    },
  })
  return {
    updateCategory,
    ...rest,
  }
}
