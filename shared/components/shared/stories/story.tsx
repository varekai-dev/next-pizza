'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'
import { CreateStoryItem, ImageCard, Title, UpdateStory, UpdateStoryItem } from '@/shared/components/shared'
import { useDeleteStory, useDeleteStoryItem } from '@/shared/hooks'
import { Api } from '@/shared/services/api-client'

interface Props {
  id: string
}

export const Story: React.FC<Props> = ({ id }) => {
  const { data: story, isLoading: isLoadingStory } = useQuery({
    queryKey: [QueryKey.GET_STORY, id],
    queryFn: () => Api.stories.getStory(id),
  })
  const { deleteStory, isPending: isDeleteStoryPending } = useDeleteStory()
  const { deleteStoryItem, isPending: isDeleteStoryItemPending } = useDeleteStoryItem()

  return (
    <div className="overflow-y-auto">
      <Title text="Story" size="md" className="mb-5 font-bold" />
      <ImageCard
        srcUrl={story?.previewImageUrl}
        actions={<UpdateStory id={id} />}
        onDelete={() => deleteStory(id)}
        isLoading={isDeleteStoryPending || isLoadingStory}
      />
      <Title text="Story Items" size="md" className="my-5 font-bold" />
      <div className="flex w-full flex-nowrap gap-5 overflow-x-auto sm:flex-wrap">
        {(isLoadingStory || isDeleteStoryItemPending) &&
          [...Array(2)].map((_, index) => (
            <div key={index} className="h-[250px] w-[200px] min-w-[200px] animate-pulse rounded-md bg-gray-200" />
          ))}
        {story?.items.map((item) => (
          <ImageCard
            actions={<UpdateStoryItem itemId={item.id} />}
            key={item.id}
            srcUrl={item.sourceUrl}
            onDelete={() => deleteStoryItem(item.id)}
            isLoading={isDeleteStoryItemPending || isLoadingStory}
            objectFit="cover"
          />
        ))}
        <CreateStoryItem storyId={id} />
      </div>
    </div>
  )
}
