import { Story, StoryItem } from '@prisma/client'

import { axiosInstance } from './instance'

export type IStory = Story & {
  items: StoryItem[]
}

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>('/stories')

  return data
}

export const getStory = async (id: string) => {
  const { data } = await axiosInstance.get<IStory>(`/stories/${id}`)

  return data
}
