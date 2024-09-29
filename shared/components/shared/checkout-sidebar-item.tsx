import React from 'react'

import { cn } from '@/shared/lib'

import { Skeleton } from '../ui'

interface Props {
  className?: string
  loading?: boolean
  icon: React.ReactNode
  title: string
  value: number
}

export const CheckoutSidebarItem: React.FC<Props> = ({ className, loading, icon, title, value }) => {
  return (
    <div className={cn('my-4 flex', className)}>
      {loading ? (
        <Skeleton className="h-7 w-full" />
      ) : (
        <>
          <span className="flex flex-1 text-lg text-neutral-400">
            <div className="flex items-center">
              {icon}
              {title}
            </div>
            <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
          </span>
          <span className="text-lg font-bold">{value} ₴</span>
        </>
      )}
    </div>
  )
}
