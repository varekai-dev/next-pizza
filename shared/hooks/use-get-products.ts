'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useGetProducts = () => {
  const { data: products, ...rest } = useQuery({
    queryKey: [QueryKey.GET_PRODUCTS],
    queryFn: Api.products.getAll,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  return { products, ...rest }
}
