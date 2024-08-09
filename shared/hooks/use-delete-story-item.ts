'use client'

import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { getQueryClient } from '../components/shared/providers'
import { Api } from '../services/api-client'
import { IStory } from '../services/stories'

export const useDeleteStoryItem = () => {
  const queryClient = getQueryClient()
  const { mutate: deleteStoryItem, ...rest } = useMutation({
    mutationFn: Api.storyItems.deleteStoryItem,
    onSuccess: (data, payload) => {
      queryClient.setQueryData([QueryKey.GET_STORY, data.storyId], (oldData: IStory | undefined) => {
        if (!oldData) {
          return undefined
        }
        return {
          ...oldData,
          items: oldData.items.filter((item) => item.id !== payload.itemId),
        }
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_STORIES],
      })
      toast.success('Item deleted successfully')
    },
  })
  return {
    deleteStoryItem,
    ...rest,
  }
}
