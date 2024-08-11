'use client'

import React from 'react'

import { STORY_PREVIEW_ASPECT, STORY_PREVIEW_HEIGHT, STORY_PREVIEW_WIDTH } from '@/shared/constants'
import { useCreateStory, useStories } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { AddButton } from '../add-button'
import { CropImage } from '../crop-image'

interface Props {
  className?: string
}

export const CreateStory: React.FC<Props> = ({ className }) => {
  const { createStory, isPending } = useCreateStory()
  const { stories, isLoading } = useStories()

  const handleCreateStory = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    createStory(formData)
  }

  if (!stories || stories.length >= 6 || isLoading) {
    return null
  }

  return (
    <div
      className={cn(
        `w-[${STORY_PREVIEW_WIDTH}px] h-[${STORY_PREVIEW_HEIGHT}px] flex items-center justify-center`,
        className,
      )}
    >
      <CropImage onCropImage={handleCreateStory} aspect={STORY_PREVIEW_ASPECT} isLoading={isPending}>
        <Button variant="link" size="lg" className="text-lg text-gray-500">
          <AddButton />
        </Button>
      </CropImage>
    </div>
  )
}
