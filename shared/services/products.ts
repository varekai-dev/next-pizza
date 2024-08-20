import { Product } from '@prisma/client'

import { ApiRoute } from '@/@types'
import { ProductWithRelations } from '@/@types/prisma'

import { axiosInstance } from './instance'

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(ApiRoute.SEARCH_PRODUCTS, {
    params: { query },
  })
  return data
}

export type GetProductsParams = {
  include?: ('ingredients' | 'items')[]
}

export const getAll = async ({ params }: { params: GetProductsParams }): Promise<ProductWithRelations[]> => {
  const { data } = await axiosInstance.get<ProductWithRelations[]>(ApiRoute.PRODUCTS, {
    params,
  })
  return data
}

export const getProduct = async ({
  id,
  params,
}: {
  id: string
  params: GetProductsParams
}): Promise<ProductWithRelations> => {
  const { data } = await axiosInstance.get<ProductWithRelations>(`${ApiRoute.PRODUCTS}/${id}`, { params })
  return data
}

export const createPizza = async (data: FormData): Promise<ProductWithRelations> => {
  const { data: product } = await axiosInstance.post<ProductWithRelations>(ApiRoute.PRODUCTS, data)
  return product
}
