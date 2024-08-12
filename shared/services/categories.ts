import { Category } from '@prisma/client'

import { ApiRoute } from '@/@types'
import { ProductWithRelations } from '@/@types/prisma'

import { axiosInstance } from './instance'

export interface GetSearchParams {
  query?: string
  sortBy?: string
  sizes?: string
  pizzaTypes?: string
  ingredients?: string
  priceFrom?: string
  priceTo?: string
}

export type CategoryWithProducts = Category & {
  products?: ProductWithRelations[]
}

export const getAll = async ({ params }: { params?: GetSearchParams }): Promise<CategoryWithProducts[]> => {
  const { data } = await axiosInstance.get<CategoryWithProducts[]>(ApiRoute.CATEGORIES, { params })
  return data
}

export const updateCategory = async ({
  id,
  data,
}: {
  id: string
  data: {
    name: string
  }
}): Promise<Category> => {
  const response = await axiosInstance.patch<Category>(`${ApiRoute.CATEGORIES}/${id}`, data)
  return response.data
}
