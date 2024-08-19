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
        'group border border-white flex items-center flex-col p-1 rounded-md w-34 text-center relative shadow-md bg-white select-none overflow-hidden h-full',
        { 'border border-primary': active, 'cursor-pointer': onClick },
        className,
      )}
      onClick={onClick}
    >
      <DeleteWrapper onSubmit={onDelete} className="absolute right-2 top-2 bg-red-400/80 hidden group-hover:flex">
        <X className="text-white cursor-pointer group-hover:text-white z-10" size={20} />
      </DeleteWrapper>
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <Image width={110} height={110} src={imageUrl} alt={name} />
      <span className="text-sm mb-1">{name}</span>
      <span className="font-bold">{price} ₴</span>
    </div>
  )
}
