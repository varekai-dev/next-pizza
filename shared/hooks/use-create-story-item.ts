'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useCreateStoryItem = () => {
  const queryClient = useQueryClient()
  const { mutate: createStoryItem, ...rest } = useMutation({
    mutationFn: Api.storyItems.createStoryItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_STORIES],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_STORY, data.storyId],
      })
      toast.success('Story Item created successfully')
    },
  })

  return {
    createStoryItem,
    ...rest,
  }
}
