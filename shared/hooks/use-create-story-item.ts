'use client'

import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { getQueryClient } from '../components/shared/providers'
import { Api } from '../services/api-client'
import { IStory } from '../services/stories'

export const useCreateStoryItem = () => {
  const queryClient = getQueryClient()
  const { mutate: createStoryItem, ...rest } = useMutation({
    mutationFn: Api.storyItems.createStoryItem,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.GET_STORY, data.storyId], (oldData: IStory | undefined) => {
        if (!oldData) {
          return undefined
        }
        return {
          ...oldData,
          items: [...oldData.items, data],
        }
      })
      queryClient.setQueryData([QueryKey.GET_STORIES], (oldData: IStory[] | undefined) => {
        if (!oldData) {
          return undefined
        }
        return oldData.map((story) => {
          if (story.id === data.storyId) {
            return {
              ...story,
              items: [...story.items, data],
            }
          }
          return story
        })
      })
      toast.success('Story Item created successfully')
    },
  })

  return {
    createStoryItem,
    ...rest,
  }
}
