'use client'

import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { getQueryClient } from '../components/shared/providers'
import { Api } from '../services/api-client'
import { IStory } from '../services/stories'

export const useUpdateStoryItem = () => {
  const queryClient = getQueryClient()
  const { mutate: updateStory, ...rest } = useMutation({
    mutationFn: Api.storyItems.updateStoryItem,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.GET_STORY, data.storyId], (oldStory: IStory | undefined) => {
        if (!oldStory) {
          return undefined
        }
        return {
          ...oldStory,
          items: oldStory.items.map((item) => {
            if (item.id === data.id) {
              return data
            }
            return item
          }),
        }
      })
      queryClient.setQueryData([QueryKey.GET_STORIES, data.id], (oldStories: IStory[] | undefined) => {
        if (!oldStories) {
          return undefined
        }
        return oldStories.map((story) => {
          if (story.id === data.storyId) {
            return {
              ...story,
              items: story.items.map((item) => {
                if (item.id === data.id) {
                  return data
                }
                return item
              }),
            }
          }
          return story
        })
      })
      toast.success('Item updated successfully')
    },
  })

  return {
    updateStory,
    ...rest,
  }
}
