'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'
import { IStory } from '../services/stories'

export const useCreateStory = () => {
  const queryClient = useQueryClient()
  const { mutate: createStory, ...rest } = useMutation({
    mutationFn: Api.stories.createStory,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.GET_STORIES], (oldData: IStory[] | undefined) => {
        if (!oldData) {
          return undefined
        }
        return [...oldData, { ...data, items: [] }]
      })
      toast.success('Story created successfully')
    },
  })

  return {
    createStory,
    ...rest,
  }
}
