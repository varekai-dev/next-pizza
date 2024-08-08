import React from 'react'
import Image from 'next/image'
import { CircleCheck } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

interface Props {
  className?: string
  imageUrl: string
  name: string
  active?: boolean
  onClick?: () => void
  price: number
}

export const IngredientItem: React.FC<Props> = ({ className, imageUrl, name, active, onClick, price }) => {
  return (
    <div
      className={cn(
        'border border-white flex items-center flex-col p-1 rounded-md w-34 text-center relative cursor-pointer shadow-md bg-white select-none',
        { 'border border-primary': active },
        className,
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <Image width={110} height={110} src={imageUrl} alt={name} />
      <span className="text-sm mb-1">{name}</span>
      <span className="font-bold">{price} ₴</span>
    </div>
  )
}
