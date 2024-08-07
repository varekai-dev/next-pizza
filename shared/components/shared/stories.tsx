'use client'

import { cn } from '@/shared/lib'
import { Api } from '@/shared/services/api-client'
import { IStory } from '@/shared/services/stories'
import React from 'react'
import { Container } from './container'
import { X } from 'lucide-react'
import ReactStories from 'react-insta-stories'
import Image from 'next/image'

interface Props {
    className?: string
}

export const Stories: React.FC<Props> = ({ className }) => {
    const [stories, setStories] = React.useState<IStory[]>([])
    const [open, setOpen] = React.useState(false)
    const [selectedStory, setSelectedStory] = React.useState<IStory | null>(
        null
    )

    React.useEffect(() => {
        async function fetchStories() {
            const stories = await Api.stories.getAll()
            setStories(stories)
        }
        fetchStories()
    }, [])

    const onClickStory = (story: IStory) => {
        setSelectedStory(story)

        if (story.items.length > 0) {
            setOpen(true)
        }
    }

    return (
        <>
            <Container className={cn('w-full overflow-x-auto', className)}>
                <div className="flex flex-start gap-2 my-10 w-[600px]">
                    {stories.length === 0 &&
                        [...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
                            />
                        ))}
                    {stories.map(story => (
                        <div
                            key={story.id}
                            className="w-[200px] h-[250px] overflow-hidden rounded-md cursor-pointer"
                        >
                            <Image
                                alt="story"
                                onClick={() => onClickStory(story)}
                                className=""
                                height={250}
                                width={200}
                                src={story.previewImageUrl}
                            />
                        </div>
                    ))}
                </div>
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
                            width={520}
                            height={684}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
