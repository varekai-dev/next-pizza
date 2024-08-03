'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { X } from 'lucide-react'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import * as CartItemDetails from './cart-item-details'
import { CountButtonProps } from './count-button'
import { DeleteWrapper } from './delete-button'

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
                    'opacity-50 pointer-events-none': disabled,
                },
                className
            )}
        >
            <div className="flex items-center gap-5 flex-1">
                <CartItemDetails.Image src={imageUrl} />
                <CartItemDetails.Info name={name} details={details} />
            </div>

            <CartItemDetails.Price value={price} />

            <div className="flex items-center gap-5 sm:ml-20">
                <CartItemDetails.CountButton
                    className="hidden sm:flex"
                    onClick={onClickCountButton}
                    value={quantity}
                />
                <DeleteWrapper onSubmit={onClickRemove}>
                    <X
                        className="text-gray-400 cursor-pointer group-hover:text-white z-10"
                        size={20}
                    />
                </DeleteWrapper>
            </div>
        </div>
    )
}
