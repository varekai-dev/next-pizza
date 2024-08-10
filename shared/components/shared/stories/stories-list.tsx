'use client'

import React from 'react'

import { useStories } from '@/shared/hooks'
import { IStory } from '@/shared/services/stories'

import { StoryPreview } from './story-preview'

interface Props {
  onClickStory?: (story: IStory) => void
}

export const StoriesList: React.FC<Props> = ({ onClickStory }) => {
  const { stories, isLoading } = useStories()

  return (
    <>
      {isLoading &&
        [...Array(stories?.length || 6)].map((_, index) => (
          <div key={index} className={`min-w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse`} />
        ))}
      {stories &&
        stories.map((story) => (
          <div className="cursor-pointer" key={story.id} onClick={() => onClickStory?.(story)}>
            <StoryPreview id={story.id} srcUrl={story.previewImageUrl} preview />
          </div>
        ))}
    </>
  )
}
