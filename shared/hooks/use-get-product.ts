'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'
import { GetProductsParams } from '../services/products'

export const useGetProduct = ({ id, params }: { id: string; params: GetProductsParams }) => {
  const { data: product, ...rest } = useQuery({
    queryKey: [QueryKey.GET_INGREDIENT, id],
    queryFn: () => Api.products.getProduct({ id, params }),
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  return { product, ...rest }
}
