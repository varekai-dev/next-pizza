'use client'

import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

import { STORY_PREVIEW_HEIGHT, STORY_PREVIEW_WIDTH } from '@/shared/constants'
import { cn } from '@/shared/lib'

import { DeleteWrapper } from '../delete-button'
import { UpdateStory } from './update-story'

interface Props {
  className?: string
  srcUrl: string
  onDelete?: (id: string) => void
  id: string
  preview?: boolean
}

export const StoryPreview: React.FC<Props> = ({ className, srcUrl, onDelete, id, preview }) => {
  const [loading, setLoading] = React.useState(true)
  return (
    <div className={cn(`relative rounded-md overflow-hidden group h-[250px] w-[200px]`, className)}>
      <Image
        src={srcUrl}
        alt="story"
        width={STORY_PREVIEW_WIDTH}
        height={STORY_PREVIEW_HEIGHT}
        priority
        onLoad={() => setLoading(false)}
      />
      {!preview && (
        <div className="absolute transition duration-300 top-0 left-0 right-0 bottom-0 bg-gray-400/30  justify-center items-center flex opacity-0 group-hover:opacity-100">
          <UpdateStory id={id} />
          <DeleteWrapper
            className="absolute top-2 right-2 bg-red-400/80"
            onSubmit={() => {
              onDelete?.(id)
            }}
          >
            <X className=" cursor-pointer text-white z-10" size={20} />
          </DeleteWrapper>
        </div>
      )}
      {loading && <div className="absolute bg-gray-200 rounded-md animate-pulse top-0 left-0 right-0 bottom-0" />}
    </div>
  )
}
