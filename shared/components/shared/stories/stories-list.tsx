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
          <div key={index} className={`h-[250px] min-w-[200px] animate-pulse rounded-md bg-gray-200`} />
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
