import { Category, Prisma, Product } from '@prisma/client'

import { ApiRoute } from '@/@types'

import { axiosInstance } from './instance'

export type CategoryParams = Prisma.CategoryFindManyArgs

export type CategoryWithProducts = Category & {
  products?: Product[]
}

export const getAll = async ({ params }: { params: CategoryParams }): Promise<CategoryWithProducts[]> => {
  const { data } = await axiosInstance.get<CategoryWithProducts[]>(ApiRoute.CATEGORIES, { params })
  return data
}
