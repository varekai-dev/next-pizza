'use client'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { QueryKey, Route } from '@/@types'

import { getQueryClient } from '../components/shared/providers'
import { Api } from '../services/api-client'
import { IStory } from '../services/stories'

export const useDeleteStory = () => {
  const queryClient = getQueryClient()
  const router = useRouter()
  const { mutate: deleteStory, ...rest } = useMutation({
    mutationFn: Api.stories.deleteStory,
    onSuccess: (_, payload) => {
      console.log('data', payload)
      router.push(Route.STORIES)
      queryClient.setQueryData([QueryKey.GET_STORIES], (oldData: IStory[] | undefined) => {
        if (!oldData) {
          return undefined
        }
        return oldData?.filter((story) => story.id !== payload)
      })
      toast.success('Story deleted successfully')
    },
  })
  return {
    deleteStory,
    ...rest,
  }
}
