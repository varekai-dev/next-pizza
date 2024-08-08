'use client'

import React from 'react'
import { UploadImage } from './upload-image'
import { STORY_ITEM_ASPECT } from '@/shared/constants'

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
