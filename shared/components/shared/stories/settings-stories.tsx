'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { useStories } from '@/shared/hooks'
import { IStory } from '@/shared/services/stories'

import { CreateStory } from './create-story'
import { StoriesList } from './stories-list'

export const SettingsStories: React.FC = () => {
  const queryClient = useQueryClient()
  const { stories, isLoading } = useStories()
  const router = useRouter()

  const onClickStory = (story: IStory) => {
    queryClient.setQueryData(['GET_STORY', story.id], story)
    router.push(`/settings/stories/${story.id}`)
  }
  return (
    <div className="flex w-full flex-nowrap justify-start gap-2 overflow-x-auto sm:flex-wrap">
      <StoriesList stories={stories} isLoading={isLoading} onClickStory={onClickStory} />
      <CreateStory />
    </div>
  )
}
