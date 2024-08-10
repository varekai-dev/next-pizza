'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useDeleteStoryItem = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteStoryItem, ...rest } = useMutation({
    mutationFn: Api.storyItems.deleteStoryItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_STORY, data.storyId],
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
