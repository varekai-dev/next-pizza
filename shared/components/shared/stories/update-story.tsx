'use client'

import React from 'react'

import { STORY_PREVIEW_ASPECT, STORY_PREVIEW_HEIGHT, STORY_PREVIEW_WIDTH } from '@/shared/constants'
import { useUpdateStory } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { CropImage } from '../crop-image'

interface Props {
  className?: string
  id: string
}

export const UpdateStory: React.FC<Props> = ({ className, id }) => {
  const { updateStory, isPending } = useUpdateStory()

  const handleCreateStory = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    updateStory({ id, payload: formData })
  }

  return (
    <div
      className={cn(
        `w-[${STORY_PREVIEW_WIDTH}px] h-[${STORY_PREVIEW_HEIGHT}px] flex items-center justify-center bg-gray-200/30 rounded-md`,
        className,
      )}
    >
      <CropImage onCropImage={handleCreateStory} aspect={STORY_PREVIEW_ASPECT} isLoading={isPending}>
        <Button variant="secondary" size="lg" className="text-lg">
          Update story
        </Button>
      </CropImage>
    </div>
  )
}
