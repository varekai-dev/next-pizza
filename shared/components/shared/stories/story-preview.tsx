'use client'

import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

import { STORY_PREVIEW_HEIGHT, STORY_PREVIEW_WIDTH } from '@/shared/constants'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { DeleteWrapper } from '../delete-button'

interface Props {
  className?: string
  srcUrl: string
  onDelete?: (id: string) => void
  id: string
}

export const StoryPreview: React.FC<Props> = ({ className, srcUrl, onDelete, id }) => {
  return (
    <div className={cn(`relative rounded-md overflow-hidden group w-[${STORY_PREVIEW_WIDTH}px]`, className)}>
      <Image src={srcUrl} alt="story" width={STORY_PREVIEW_WIDTH} height={STORY_PREVIEW_HEIGHT} />
      <div className="absolute transition duration-300 top-0 left-0 right-0 bottom-0 bg-gray-400/30  justify-center items-center flex opacity-0 group-hover:opacity-100">
        <Button variant="secondary">Change</Button>
        <DeleteWrapper
          className="absolute top-2 right-2 bg-red-400/80"
          onSubmit={() => {
            onDelete?.(id)
          }}
        >
          <X className=" cursor-pointer text-white z-10" size={20} />
        </DeleteWrapper>
      </div>
    </div>
  )
}