import React from 'react'
import { OrderStatus } from '@prisma/client'

import { cn } from '@/shared/lib'

interface Props {
  className?: string
  status: OrderStatus
}

export const Tag: React.FC<Props> = ({
  className,

  status,
}) => {
  const text = {
    [OrderStatus.PENDING]: 'Pending',
    [OrderStatus.SUCCEEDED]: 'Succeeded',
    [OrderStatus.CANCELLED]: 'Cancelled',
  }[status]

  return (
    <div
      className={cn('px-8 py-2 rounded-lg ', className, {
        'bg-[#eaf8f4] text-[#1bb486]': status === OrderStatus.SUCCEEDED,
        'bg-[#fff0ef] text-[#ff544a]': status === OrderStatus.CANCELLED,
        'bg-[#FFF3B4] text-[#917C12]': status === OrderStatus.PENDING,
      })}
    >
      {text}
    </div>
  )
}
