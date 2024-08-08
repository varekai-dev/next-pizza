import React from 'react'

import { Api } from '../services/api-client'
import { IStory } from '../services/stories'

export const useStories = () => {
  const [stories, setStories] = React.useState<IStory[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchStories() {
      try {
        setLoading(true)
        const stories = await Api.stories.getAll()
        setStories(stories)
      } catch (error) {
        console.log('error [FETCH_STORIES]: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  return { stories, loading }
}
