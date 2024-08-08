'use client'

import React from 'react'

import { StoryPreview, Title } from '@/shared/components/shared'
import { IStory } from '@/shared/services/stories'

interface Props {
  className?: string
  story: IStory
}

export const SingleStory: React.FC<Props> = ({ className, story }) => {
  const onDelete = (id: string) => {
    console.log('delete', id)
  }
  return (
    <div>
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
