'use client'

import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { getQueryClient } from '../components/shared/providers'
import { Api } from '../services/api-client'
import { IStory } from '../services/stories'

export const useUpdateStory = () => {
  const queryClient = getQueryClient()
  const { mutate: updateStory, ...rest } = useMutation({
    mutationFn: Api.stories.updateStory,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.GET_STORY, data.id], (oldData: IStory | undefined) => {
        if (!oldData) {
          return undefined
        }
        return data
      })
      toast.success('Story updated successfully')
      queryClient.setQueryData([QueryKey.GET_STORIES], (oldData: IStory[] | undefined) => {
        if (!oldData) {
          return undefined
        }
        return oldData.map((story) => {
          if (story.id === data.id) {
            return data
          }
          return story
        })
      })
    },
  })

  return {
    updateStory,
    ...rest,
  }
}
