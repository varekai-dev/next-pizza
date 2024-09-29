'use client'

import React from 'react'
import { Trash2Icon } from 'lucide-react'

import { cn } from '@/shared/lib'

import { CountButton } from '../count-button'
import { DeleteWrapper } from '../delete-button'
import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'

interface Props extends CartItemProps {
  className?: string
  onClickCountButton?: (type: 'plus' | 'minus') => void
  onClickRemoveButton?: () => void
}

export const CartDrawerItem: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemoveButton,
}) => {
  return (
    <div
      className={cn('flex gap-6 bg-white p-5', className, {
        'pointer-events-none': disabled,
      })}
    >
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info name={name} details={details} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton value={quantity} onClick={onClickCountButton} />
          <div className="flex items-center gap-3">
            <CartItem.Price value={price} className="mt-[2px]" />
            <DeleteWrapper onSubmit={onClickRemoveButton}>
              <Trash2Icon className={cn('z-10 cursor-pointer text-gray-400 group-hover:text-white')} size={16} />
            </DeleteWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}
