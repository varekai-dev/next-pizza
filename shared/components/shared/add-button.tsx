import React from 'react'
import { CirclePlus, LoaderPinwheel } from 'lucide-react'

import { cn } from '@/shared/lib'

interface Props {
  className?: string
  loading?: boolean
  onClick?: () => void
}

export const AddButton: React.FC<Props> = ({ className, loading, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn('cursor-pointer active:translate-y-[1px]', className, {
        'pointer-events-none': loading,
        'opacity-50': loading,
      })}
    >
      {loading ? <LoaderPinwheel size={40} className="animate-spin" /> : <CirclePlus size={40} />}
    </div>
  )
}
