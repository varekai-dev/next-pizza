'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CircleUser, User } from 'lucide-react'

import { Button, Skeleton } from '../../ui'
import { SettingPopup } from './setting-popup'

interface Props {
  className?: string
  onClickSignIn?: () => void
}

export const SettingButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const isLoading = session === undefined

  if (isLoading) {
    return <Skeleton className="h-[40px] w-[97px]" />
  }

  return (
    <div className={className}>
      {session ? (
        <SettingPopup role={session.user.role} pathname={pathname}>
          <Button variant="secondary" className="flex items-center gap-2 font-semibold">
            <CircleUser size={18} />
            Settings
          </Button>
        </SettingPopup>
      ) : (
        <Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-3">
          <User size={16} />
          Login
        </Button>
      )}
    </div>
  )
}
