'use client'

import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { getQueryClient } from '../components/shared/providers'
import { Api } from '../services/api-client'
import { IStory } from '../services/stories'

export const useCreateStory = () => {
  const queryClient = getQueryClient()
  const { mutate: createStory, ...rest } = useMutation({
    mutationFn: Api.stories.createStory,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.GET_STORIES], (oldData: IStory[] | undefined) => {
        if (!oldData) {
          return undefined
        }
        return [...oldData, data]
      })
      toast.success('Story created successfully')
    },
  })

  return {
    createStory,
    ...rest,
  }
}
