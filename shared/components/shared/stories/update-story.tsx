'use client'

import React from 'react'

import { STORY_PREVIEW_ASPECT } from '@/shared/constants'
import { useUpdateStory } from '@/shared/hooks'

import { Button } from '../../ui'
import { CropImage } from '../crop-image'

interface Props {
  id: string
}

export const UpdateStory: React.FC<Props> = ({ id }) => {
  const { updateStory, isPending } = useUpdateStory()

  const handleCreateStory = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    updateStory({ id, payload: formData })
  }

  return (
    <CropImage onCropImage={handleCreateStory} aspect={STORY_PREVIEW_ASPECT} isLoading={isPending}>
      <Button variant="secondary" size="lg" className="text-lg">
        Update story
      </Button>
    </CropImage>
  )
}
