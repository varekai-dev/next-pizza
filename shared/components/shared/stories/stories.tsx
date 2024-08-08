'use client'

import { IStory } from '@/shared/services/stories'
import React from 'react'
import { Container } from '../container'
import { X } from 'lucide-react'
import ReactStories from 'react-insta-stories'

import { STORY_ITEM_WIDTH, STORY_ITEM_HEIGHT } from '@/shared/constants'

import { StoriesList } from './stories-list'

interface Props {
    className?: string
}

export const Stories: React.FC<Props> = ({ className }) => {
    const [open, setOpen] = React.useState(false)
    const [selectedStory, setSelectedStory] = React.useState<IStory | null>(
        null
    )

    const onClickStory = (story: IStory) => {
        setSelectedStory(story)

        if (story.items.length > 0) {
            setOpen(true)
        }
    }

    return (
        <>
            <Container className="flex flex-start gap-2 my-10 overflow-x-auto">
                <StoriesList onClickStory={onClickStory} />
            </Container>
            {open && (
                <div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-40">
                    <div className="relative w-[520px]">
                        <button
                            className="absolute -right-10 -top-5 z-30"
                            onClick={() => setOpen(false)}
                        >
                            <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
                        </button>
                        <ReactStories
                            onAllStoriesEnd={() => setOpen(false)}
                            stories={
                                selectedStory?.items.map(item => ({
                                    url: item.sourceUrl,
                                })) || []
                            }
                            defaultInterval={3000}
                            width={STORY_ITEM_WIDTH}
                            height={STORY_ITEM_HEIGHT}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
