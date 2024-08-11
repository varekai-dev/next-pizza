'use client'

import React from 'react'

import { STORY_ITEM_ASPECT } from '@/shared/constants'
import { useCreateStoryItem } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { AddButton } from '../add-button'
import { CropImage } from '../crop-image'

interface Props {
  className?: string
  storyId: string
}

export const CreateStoryItem: React.FC<Props> = ({ className, storyId }) => {
  const { createStoryItem, isPending } = useCreateStoryItem()
  const handleCreateStoryItem = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('id', storyId)
    createStoryItem({ payload: formData })
  }

  return (
    <div className={cn(`min-w-[200px] w-[200px] h-[250px] flex items-center justify-center`, className)}>
      <CropImage onCropImage={handleCreateStoryItem} aspect={STORY_ITEM_ASPECT} isLoading={isPending}>
        <AddButton />
      </CropImage>
    </div>
  )
}
