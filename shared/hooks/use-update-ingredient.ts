'use client'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKey, Route } from '@/@types'

import { Api } from '../services/api-client'

export const useUpdateIngredient = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: updateIngredient, ...rest } = useMutation({
    mutationFn: Api.ingredients.updateIngredient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_INGREDIENT, data.id],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_INGREDIENTS],
      })
      toast.success('Ingredient updated successfully')
      router.push(Route.INGREDIENTS)
    },
  })

  return {
    updateIngredient,
    ...rest,
  }
}
