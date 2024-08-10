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
      <Title text="Story" size="md" className="font-bold mb-5" />
      <ImageCard
        srcUrl={story?.previewImageUrl}
        actions={<UpdateStory id={id} />}
        onDelete={() => deleteStory(id)}
        isLoading={isDeleteStoryPending || isLoadingStory}
      />
      <Title text="Story Items" size="md" className="font-bold my-5" />
      <div className="flex gap-5 sm:flex-wrap flex-no-wrap w-full overflow-x-auto">
        {(isLoadingStory || isDeleteStoryItemPending) &&
          [...Array(2)].map((_, index) => (
            <div key={index} className="min-w-[200px] w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
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
