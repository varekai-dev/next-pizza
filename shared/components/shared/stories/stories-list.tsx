'use client'

import React from 'react'

import { IStory } from '@/shared/services/stories'

import { ImageCard } from '../image-card'

interface Props {
  onClickStory?: (story: IStory) => void
  stories?: IStory[]
  isLoading?: boolean
}

export const StoriesList: React.FC<Props> = ({ onClickStory, stories, isLoading }) => {
  return (
    <>
      {isLoading &&
        !stories?.length &&
        [...Array(stories?.length || 6)].map((_, index) => (
          <div key={index} className={`min-w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse`} />
        ))}
      {stories &&
        stories.map((story) => (
          <div className="cursor-pointer" key={story.id} onClick={() => onClickStory?.(story)}>
            <ImageCard srcUrl={story.previewImageUrl} />
          </div>
        ))}
    </>
  )
}
