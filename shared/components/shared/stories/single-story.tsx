'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'
import { StoryPreview, Title } from '@/shared/components/shared'
import { STORY_PREVIEW_HEIGHT, STORY_PREVIEW_WIDTH } from '@/shared/constants'
import { useDeleteStory } from '@/shared/hooks'
import { Api } from '@/shared/services/api-client'

interface Props {
  className?: string
  id: string
}

export const SingleStory: React.FC<Props> = ({ className, id }) => {
  const { data: story, isLoading } = useQuery({
    queryKey: [QueryKey.GET_STORY, id],
    queryFn: () => Api.stories.getStory(id),
  })

  const { deleteStory, isPending } = useDeleteStory()

  const loading = isLoading || isPending

  return (
    <div className={className}>
      <Title text="Story" size="md" className="font-bold mb-5" />
      {loading && (
        <div
          className={`w-[${STORY_PREVIEW_WIDTH}px] h-[${STORY_PREVIEW_HEIGHT}px] bg-gray-200 rounded-md animate-pulse`}
        />
      )}
      {!loading && story && <StoryPreview srcUrl={story.previewImageUrl} onDelete={deleteStory} id={story.id} />}
      <Title text="Story Items" size="md" className="font-bold my-5" />
      <div className="flex gap-5">
        {loading &&
          [...Array(2)].map((_, index) => (
            <div
              key={index}
              className={`w-[${STORY_PREVIEW_WIDTH}px] h-[${STORY_PREVIEW_HEIGHT}px] bg-gray-200 rounded-md animate-pulse`}
            />
          ))}
        {!loading &&
          story &&
          story.items.map((item) => (
            <StoryPreview
              key={item.id}
              id={item.id}
              srcUrl={item.sourceUrl}
              onDelete={(id: string) => {
                console.log('id', id)
              }}
            />
          ))}
      </div>
    </div>
  )
}
