'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useUpdateStoryItem = () => {
  const queryClient = useQueryClient()
  const { mutate: updateStory, ...rest } = useMutation({
    mutationFn: Api.storyItems.updateStoryItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_STORIES],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_STORY, data.storyId],
      })
      toast.success('Item updated successfully')
    },
  })

  return {
    updateStory,
    ...rest,
  }
}
