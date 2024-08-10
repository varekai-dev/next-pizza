import { StoryItem } from '@prisma/client'

import { axiosInstance } from './instance'

export const createStoryItem = async ({ payload }: { payload: FormData }) => {
  const { data } = await axiosInstance.post<StoryItem>(`/story-items`, payload)
  return data
}

export const deleteStoryItem = async (itemId: string) => {
  const { data } = await axiosInstance.delete<StoryItem>(`/story-items/${itemId}`)
  return data
}

export const updateStoryItem = async ({ itemId, payload }: { itemId: string; payload: FormData }) => {
  const { data } = await axiosInstance.patch<StoryItem>(`/story-items/${itemId}`, payload)
  return data
}
