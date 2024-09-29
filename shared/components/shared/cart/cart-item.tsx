'use client'

import React from 'react'
import { X } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

import { CountButtonProps } from '../count-button'
import { DeleteWrapper } from '../delete-button'
import * as CartItemDetails from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'

interface Props extends CartItemProps {
  onClickRemove: () => void
  onClickCountButton: CountButtonProps['onClick']
}

export const CartItem: React.FC<Props> = ({
  details,
  name,
  price,
  imageUrl,
  quantity,
  className,
  onClickCountButton,
  onClickRemove,
  disabled,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'pointer-events-none opacity-50': disabled,
        },
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-5">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="flex items-center gap-5 sm:ml-20">
        <CartItemDetails.CountButton className="hidden sm:flex" onClick={onClickCountButton} value={quantity} />
        <DeleteWrapper onSubmit={onClickRemove}>
          <X className="z-10 cursor-pointer text-gray-400 group-hover:text-white" size={20} />
        </DeleteWrapper>
      </div>
    </div>
  )
}
