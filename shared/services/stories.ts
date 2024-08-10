import { Story, StoryItem } from '@prisma/client'

import { ApiRoute } from '@/@types'

import { axiosInstance } from './instance'

export type IStory = Story & {
  items: StoryItem[]
}

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>(ApiRoute.STORIES)
  return data
}

export const getStory = async (id: string) => {
  const { data } = await axiosInstance.get<IStory>(`${ApiRoute.STORIES}/${id}`)
  return data
}

export const createStory = async (payload: FormData) => {
  const { data } = await axiosInstance.post<IStory>(`${ApiRoute.STORIES}`, payload)
  return data
}

export const deleteStory = async (id: string) => {
  const { data } = await axiosInstance.delete<IStory>(`${ApiRoute.STORIES}/${id}`)
  return data
}

export const updateStory = async ({ id, payload }: { id: string; payload: FormData }) => {
  const { data } = await axiosInstance.patch<IStory>(`${ApiRoute.STORIES}/${id}`, payload)
  return data
}
