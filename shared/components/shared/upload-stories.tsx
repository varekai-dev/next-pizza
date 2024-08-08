'use client'

import React from 'react'

import { STORY_ITEM_ASPECT } from '@/shared/constants'

import { UploadImage } from './upload-image'

interface Props {
  className?: string
}

export const UploadStories: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <UploadImage aspect={STORY_ITEM_ASPECT} />
    </div>
  )
}
