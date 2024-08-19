import { Order } from '@prisma/client'

import { ApiRoute } from '@/@types'

import { axiosInstance } from './instance'

export const getAll = async (): Promise<Order[]> => {
  const { data } = await axiosInstance.get<Order[]>(ApiRoute.ORDERS)
  return data
}
