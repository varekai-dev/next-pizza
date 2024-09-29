'use client'

import React from 'react'
import Image from 'next/image'

import { PizzaSize, PizzaType } from '@/shared/constants'
import { cn, getCartItemDetails, getIngredientsCost } from '@/shared/lib'
import { CartItemDTO } from '@/shared/services/dto/cart.dto'

import { Title } from '../title'

interface Props {
  className?: string
  item: CartItemDTO
}

export const SettingOrderItem: React.FC<Props> = ({ className, item }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between border-b border-gray-100 px-8 py-5 first:border-t md:flex-row',
        className,
      )}
    >
      {/* Left side */}
      <div className="flex flex-col items-center md:flex-row">
        <Image src={item.productItem.product.imageUrl} alt={item.productItem.product.name} width={60} height={60} />
        <div className="ml-0 flex flex-col items-center md:ml-5 md:items-start">
          <Title text={item.productItem.product.name} size="xs" className="mb-1 font-bold" />
          <div className="w-full max-w-[240px] text-gray-400">
            {getCartItemDetails(
              item.ingredients,
              item.productItem.pizzaType as PizzaType,
              item.productItem.size as PizzaSize,
            )}
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex flex-col items-end">
        <div className="mb-1 text-[16px] font-bold">{getIngredientsCost(item) + item.productItem.price} ₴</div>
        <div className="text-gray-400">
          {item.quantity} unit{item.quantity > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}
