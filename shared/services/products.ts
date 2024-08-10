import { Product } from '@prisma/client'

import { ApiRoute } from '@/@types'

import { axiosInstance } from './instance'

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(ApiRoute.SEARCH_PRODUCTS, {
    params: { query },
  })
  return data
}
