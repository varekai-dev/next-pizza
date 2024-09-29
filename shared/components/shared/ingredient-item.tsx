import React from 'react'
import Image from 'next/image'
import { CircleCheck, X } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

import { DeleteWrapper } from './delete-button'

interface Props {
  className?: string
  imageUrl: string
  name: string
  active?: boolean
  onClick?: () => void
  price: number
  onDelete?: () => void
}

export const IngredientItem: React.FC<Props> = ({ className, imageUrl, name, active, onClick, price, onDelete }) => {
  return (
    <div
      className={cn(
        'w-34 group relative flex h-full select-none flex-col items-center overflow-hidden rounded-md border border-white bg-white p-1 text-center shadow-md',
        { 'border border-primary': active, 'cursor-pointer': onClick },
        className,
      )}
      onClick={onClick}
    >
      {onDelete && (
        <DeleteWrapper onSubmit={onDelete} className="absolute right-2 top-2 hidden bg-red-400/80 group-hover:flex">
          <X className="z-10 cursor-pointer text-white group-hover:text-white" size={20} />
        </DeleteWrapper>
      )}
      {active && <CircleCheck className="absolute right-2 top-2 text-primary" />}
      <Image width={110} height={110} src={imageUrl} alt={name} />
      <span className="mb-1 text-sm">{name}</span>
      <span className="font-bold">{price} ₴</span>
    </div>
  )
}
