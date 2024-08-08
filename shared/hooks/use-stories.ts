import { QueryKey } from '@/@types'
import { Api } from '../services/api-client'

import { useQuery } from '@tanstack/react-query'

export const useStories = () => {
  const {
    data: stories,
    isSuccess,
    isFetching,
    isLoading,
    ...rest
  } = useQuery({
    queryKey: [QueryKey.GET_STORIES],
    queryFn: Api.stories.getAll,
  })

  return { stories, isLoading: isLoading || isFetching, ...rest }
}
