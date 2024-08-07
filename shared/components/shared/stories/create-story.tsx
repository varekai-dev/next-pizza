'use client'

import React from 'react'

import { STORY_ITEM_ASPECT, STORY_PREVIEW_HEIGHT, STORY_PREVIEW_WIDTH } from '@/shared/constants'
import { useCreateStory } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { CropImage } from '../crop-image'

interface Props {
  className?: string
}

export const CreateStory: React.FC<Props> = ({ className }) => {
  const { createStory, isPending } = useCreateStory()

  const handleCreateStory = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    createStory(formData)
  }
  return (
    <div
      className={cn(
        `w-[${STORY_PREVIEW_WIDTH}px] h-[${STORY_PREVIEW_HEIGHT}px] flex items-center justify-center bg-gray-200/30 rounded-md`,
        className,
      )}
    >
      <CropImage onCropImage={handleCreateStory} aspect={STORY_ITEM_ASPECT} isLoading={isPending}>
        <Button variant="secondary" size="lg" className="text-lg">
          Create story
        </Button>
      </CropImage>
    </div>
  )
}
