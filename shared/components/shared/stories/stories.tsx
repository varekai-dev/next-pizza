'use client'

import React from 'react'
import ReactStories from 'react-insta-stories'
import { X } from 'lucide-react'

import { STORY_ITEM_HEIGHT, STORY_ITEM_WIDTH } from '@/shared/constants'
import { useBreakpoint, useStories } from '@/shared/hooks'
import { IStory } from '@/shared/services/stories'

import { Container } from '../container'
import { StoriesList } from './stories-list'

export const Stories: React.FC = () => {
  const { stories, isLoading } = useStories()
  const [open, setOpen] = React.useState(false)
  const [selectedStory, setSelectedStory] = React.useState<IStory | null>(null)
  const isMd = useBreakpoint('md')

  const onClickStory = (story: IStory) => {
    setSelectedStory(story)

    if (story.items.length > 0) {
      setOpen(true)
    }
  }

  return (
    <>
      <Container className="flex-start my-10 flex gap-2 overflow-x-auto">
        <StoriesList stories={stories} isLoading={isLoading} onClickStory={onClickStory} />
      </Container>
      {open && (
        <div className="fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-black/80">
          <div className={`relative md:w-[${STORY_ITEM_WIDTH}px] w-[calc(${STORY_ITEM_WIDTH}/1.8)]`}>
            <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
              <X className="absolute right-0 top-0 h-8 w-8 text-white/50" />
            </button>
            <ReactStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={
                selectedStory?.items.map((item) => ({
                  url: item.sourceUrl,
                })) || []
              }
              defaultInterval={3000}
              width={isMd ? STORY_ITEM_WIDTH : STORY_ITEM_WIDTH / 1.8}
              height={isMd ? STORY_ITEM_HEIGHT : STORY_ITEM_HEIGHT / 1.8}
            />
          </div>
        </div>
      )}
    </>
  )
}
