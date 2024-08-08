'use client'

import React from 'react'
import { StoriesList } from './stories-list'
import { useRouter } from 'next/navigation'

export const SettingsStories: React.FC = () => {
    const router = useRouter()

    const handleOpenStory = ({ id }: { id: string }) => {
        router.push(`/settings/stories/${id}`)
    }
    return (
        <div className="flex flex-start gap-2 my-10 overflow-x-auto">
            <StoriesList onClickStory={handleOpenStory} />
        </div>
    )
}
