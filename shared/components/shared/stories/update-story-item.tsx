'use client'

import React from 'react'

import { STORY_ITEM_ASPECT } from '@/shared/constants'
import { useUpdateStoryItem } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { CropImage } from '../crop-image'

interface Props {
  className?: string
  itemId: string
}

export const UpdateStoryItem: React.FC<Props> = ({ className, itemId }) => {
  const { updateStory, isPending } = useUpdateStoryItem()

  const handleCreateStory = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    updateStory({ itemId, payload: formData })
  }

  return (
    <div className={cn('w-[200px] h-[250px] flex items-center justify-center bg-gray-200/30 rounded-md', className)}>
      <CropImage onCropImage={handleCreateStory} aspect={STORY_ITEM_ASPECT} isLoading={isPending}>
        <Button variant="secondary" size="lg" className="text-lg">
          Update item
        </Button>
      </CropImage>
    </div>
  )
}
