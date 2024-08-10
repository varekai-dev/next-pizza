'use client'

import React from 'react'

import { STORY_ITEM_ASPECT } from '@/shared/constants'
import { useUpdateStoryItem } from '@/shared/hooks'

import { Button } from '../../ui'
import { CropImage } from '../crop-image'

interface Props {
  itemId: string
}

export const UpdateStoryItem: React.FC<Props> = ({ itemId }) => {
  const { updateStory, isPending } = useUpdateStoryItem()

  const handleCreateItem = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    updateStory({ itemId, payload: formData })
  }

  return (
    <CropImage onCropImage={handleCreateItem} aspect={STORY_ITEM_ASPECT} isLoading={isPending}>
      <Button variant="secondary" size="lg" className="text-lg">
        Update item
      </Button>
    </CropImage>
  )
}
