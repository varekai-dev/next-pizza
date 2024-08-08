'use client'

import React from 'react'

import { StoryPreview, Title } from '@/shared/components/shared'
import { useQuery } from '@tanstack/react-query'
import { QueryKey } from '@/@types'
import { Api } from '@/shared/services/api-client'

interface Props {
  className?: string
  id: string
}

export const SingleStory: React.FC<Props> = ({ className, id }) => {
  const onDelete = (id: string) => {
    console.log('delete', id)
  }

  const { data: story } = useQuery({
    queryKey: [QueryKey.GET_STORY, id],
    queryFn: () => Api.stories.getStory(id),
  })

  if (!story) {
    return null
  }
  return (
    <div className={className}>
      <Title text="Story" size="md" className="font-bold mb-10" />
      <StoryPreview srcUrl={story.previewImageUrl} onDelete={onDelete} id={story.id} />
      <Title text="Story Items" size="md" className="font-bold my-10" />
      <div className="flex gap-5">
        {story.items.map((item) => (
          <StoryPreview key={item.id} id={item.id} srcUrl={item.sourceUrl} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}
