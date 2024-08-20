'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useGetProducts = ({ params }: { params: any }) => {
  const { data: products, ...rest } = useQuery({
    queryKey: [QueryKey.GET_PRODUCTS, params],
    queryFn: () => Api.products.getAll({ params }),
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  return { products, ...rest }
}
