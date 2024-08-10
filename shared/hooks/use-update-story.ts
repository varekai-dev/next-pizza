'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useUpdateStory = () => {
  const queryClient = useQueryClient()
  const { mutate: updateStory, ...rest } = useMutation({
    mutationFn: Api.stories.updateStory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_STORY, data.id],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_STORIES],
      })
      toast.success('Story updated successfully')
    },
  })

  return {
    updateStory,
    ...rest,
  }
}
