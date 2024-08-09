'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { Route } from '@/@types'

import { CreateStory } from './create-story'
import { StoriesList } from './stories-list'

export const SettingsStories: React.FC = () => {
  const router = useRouter()

  const handleOpenStory = ({ id }: { id: string }) => {
    router.push(`${Route.STORIES}/${id}`)
  }
  return (
    <div className="flex flex-start gap-2 sm:flex-wrap flex-nowrap overflow-x-auto w-full">
      <StoriesList onClickStory={handleOpenStory} />
      <CreateStory />
    </div>
  )
}
