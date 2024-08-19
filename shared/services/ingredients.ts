import { Ingredient } from '@prisma/client'

import { ApiRoute } from '@/@types'

import { axiosInstance } from './instance'

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoute.INGREDIENTS)
  return data
}

export const getIngredient = async (id: string): Promise<Ingredient> => {
  const { data } = await axiosInstance.get<Ingredient>(`${ApiRoute.INGREDIENTS}/${id}`)
  return data
}

export const updateIngredient = async ({ id, payload }: { id: string; payload: FormData }) => {
  const { data } = await axiosInstance.patch<Ingredient>(`${ApiRoute.INGREDIENTS}/${id}`, payload)
  return data
}

export const createIngredient = async ({ payload }: { payload: FormData }) => {
  const { data } = await axiosInstance.post<Ingredient>(`${ApiRoute.INGREDIENTS}`, payload)
  return data
}

export const deleteIngredient = async (id: string) => {
  await axiosInstance.delete(`${ApiRoute.INGREDIENTS}/${id}`)
}
