'use client'

import { CartItemDTO } from '@/shared/services/dto/cart.dto'
import Image from 'next/image'
import React from 'react'
import { Title } from './title'
import { cn, getCartItemDetails, getIngredientsCost } from '@/shared/lib'
import { PizzaSize, PizzaType } from '@/shared/constants'

interface Props {
    className?: string
    item: CartItemDTO
}

export const SettingOrderItem: React.FC<Props> = ({ className, item }) => {
    return (
        <div
            className={cn(
                'flex items-center justify-between px-8 py-5 border-b border-gray-100 first:border-t md:flex-row flex-col',
                className
            )}
        >
            {/* Left side */}
            <div className="flex items-center md:flex-row flex-col">
                <Image
                    src={item.productItem.product.imageUrl}
                    alt={item.productItem.product.name}
                    width={60}
                    height={60}
                />
                <div className="md:ml-5 flex flex-col ml-0  md:items-start items-center">
                    <Title
                        text={item.productItem.product.name}
                        size="xs"
                        className="font-bold mb-1"
                    />
                    <div className="text-gray-400 max-w-[240px] w-full">
                        {getCartItemDetails(
                            item.ingredients,
                            item.productItem.pizzaType as PizzaType,
                            item.productItem.size as PizzaSize
                        )}
                    </div>
                </div>
            </div>
            {/* Right side */}
            <div className="flex flex-col items-end">
                <div className="font-bold text-[16px] mb-1">
                    {getIngredientsCost(item) + item.productItem.price} ₴
                </div>
                <div className="text-gray-400">
                    {item.quantity} unit{item.quantity > 1 ? 's' : ''}
                </div>
            </div>
        </div>
    )
}
