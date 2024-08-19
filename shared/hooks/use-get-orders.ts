'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useGetOrders = () => {
  const { data: orders, ...rest } = useQuery({
    queryKey: [QueryKey.GET_ORDERS],
    queryFn: () => Api.orders.getAll(),
  })
  return { orders, ...rest }
}
