'use client'

import React from 'react'

import { STORY_PREVIEW_ASPECT } from '@/shared/constants'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { CropImage } from '../crop-image'

interface Props {
  className?: string
  onCropImage: (file: File) => void
}

export const IngredientCropper: React.FC<Props> = ({ className, onCropImage }) => {
  return (
    <div className={cn('w-[200px] h-[250px] flex items-center justify-center bg-gray-200/30 rounded-md', className)}>
      <CropImage onCropImage={onCropImage} aspect={STORY_PREVIEW_ASPECT}>
        <Button variant="secondary" size="lg" className="text-lg">
          Change
        </Button>
      </CropImage>
    </div>
  )
}
