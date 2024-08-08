'use client'

import { useStories } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import { STORY_PREVIEW_HEIGHT, STORY_PREVIEW_WIDTH } from '@/shared/constants'
import { IStory } from '@/shared/services/stories'

interface Props {
    className?: string
    onClickStory?: (story: IStory) => void
}

export const StoriesList: React.FC<Props> = ({ className, onClickStory }) => {
    const { stories, loading } = useStories()
    return (
        <>
            {loading &&
                [...Array(2)].map((_, index) => (
                    <div
                        key={index}
                        className="min-w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
                    />
                ))}
            {!loading &&
                stories.map(story => (
                    <div
                        key={story.id}
                        className="min-w-[200px] w-[200px] h-[250px] overflow-hidden rounded-md cursor-pointer"
                    >
                        <Image
                            alt="story"
                            onClick={() => onClickStory?.(story)}
                            height={STORY_PREVIEW_HEIGHT}
                            width={STORY_PREVIEW_WIDTH}
                            src={story.previewImageUrl}
                        />
                    </div>
                ))}
        </>
    )
}
