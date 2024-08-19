'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Ingredient } from '@prisma/client'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteIngredient, ...rest } = useMutation({
    mutationFn: Api.ingredients.deleteIngredient,
    onSuccess: (data, payload) => {
      queryClient.setQueryData([QueryKey.GET_INGREDIENTS], (oldData: Ingredient[] | undefined) => {
        if (!oldData) {
          return
        }
        return oldData.filter((ingredient) => ingredient.id !== payload)
      })

      toast.success('Ingredient deleted successfully')
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
    deleteIngredient,
    ...rest,
  }
}
