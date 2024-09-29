import React from 'react'

import { cn } from '@/shared/lib/utils'

interface Props {
  className?: string
}

export const CartItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-5">
        <div className="size-[60px] animate-pulse rounded-full bg-gray-200" />
        <h2 className="h-5 w-40 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex items-center gap-20">
        <div className="h-5 w-[50px] animate-pulse rounded bg-gray-200" />
        <div className="hidden h-8 w-[140px] animate-pulse rounded bg-gray-200 sm:block" />
      </div>
    </div>
  )
}
