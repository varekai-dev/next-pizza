'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'
import { CategoryWithProducts } from '../services/categories'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteCategory, ...rest } = useMutation({
    mutationFn: Api.categories.deleteCategory,
    onSuccess: (data, payload) => {
      queryClient.setQueryData([QueryKey.GET_CATEGORIES_SETTINGS], (oldData: CategoryWithProducts[] | undefined) => {
        if (!oldData) {
          return
        }
        return oldData.filter((category) => category.id !== payload)
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_CATEGORIES],
      })
      toast.success('Category deleted successfully')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error)
      } else {
        toast.error('Server error')
      }
    },
  })

  return {
    deleteCategory,
    ...rest,
  }
}
