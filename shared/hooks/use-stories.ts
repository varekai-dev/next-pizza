import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'

import { Api } from '../services/api-client'

export const useStories = () => {
  const {
    data: stories,
    isFetching,
    isLoading,
    ...rest
  } = useQuery({
    queryKey: [QueryKey.GET_STORIES],
    queryFn: Api.stories.getAll,
  })

  return { stories, isLoading: isLoading || isFetching, ...rest }
}
