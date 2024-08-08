import React from 'react'

import { cn } from '@/shared/lib/utils'

interface Props {
  className?: string
}

export const CartItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-5">
        <div className="w-[60px] h-[60px] bg-gray-200 rounded-full animate-pulse" />
        <h2 className="w-40 h-5 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-20">
        <div className="h-5 w-[50px] bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-[140px] bg-gray-200 rounded animate-pulse hidden sm:block" />
      </div>
    </div>
  )
}
