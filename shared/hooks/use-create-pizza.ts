'use client'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKey, Route } from '@/@types'

import { Api } from '../services/api-client'

export const useCreatePizza = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: createPizza, ...rest } = useMutation({
    mutationFn: Api.products.createPizza,
    onSuccess: () => {
      ;[QueryKey.GET_PRODUCTS, QueryKey.GET_CATEGORIES].forEach((key) => {
        queryClient.invalidateQueries({
          queryKey: [key],
        })
      })

      toast.success('Pizza created successfully')
      router.push(Route.PRODUCTS)
    },
  })

  return {
    createPizza,
    ...rest,
  }
}
