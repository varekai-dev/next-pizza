'use client'

import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

import { cn } from '@/shared/lib'

import { DeleteWrapper } from '../delete-button'
import { UpdateStoryItem } from './update-story-item'

interface Props {
  className?: string
  srcUrl: string
  onDelete?: ({ itemId }: { itemId: string }) => void

  itemId: string
}

export const StoryItemPreview: React.FC<Props> = ({ className, srcUrl, onDelete, itemId }) => {
  return (
    <div className={cn(`relative rounded-md overflow-hidden group min-w-[200px] h-[250px] w-[200px]`, className)}>
      <Image src={srcUrl} alt="story" width={200} height={250} />
      <div className="absolute transition duration-300 top-0 left-0 right-0 bottom-0 bg-gray-400/30  justify-center items-center flex opacity-0 group-hover:opacity-100">
        <UpdateStoryItem itemId={itemId} />
        <DeleteWrapper
          className="absolute top-2 right-2 bg-red-400/80"
          onSubmit={() => {
            onDelete?.({ itemId })
          }}
        >
          <X className=" cursor-pointer text-white z-10" size={20} />
        </DeleteWrapper>
      </div>
    </div>
  )
}
