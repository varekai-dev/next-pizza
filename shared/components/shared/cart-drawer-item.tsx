'use client'

import { cn } from '@/shared/lib'
import React from 'react'
import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButton } from './count-button'
import { Trash2Icon } from 'lucide-react'
import { useOnMouseHold } from '@/shared/hooks'

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
    onClickCountButton,
    onClickRemoveButton,
}) => {
    const {
        buttonPressDown,
        buttonPressUp,

        isPressed,
        isFinished,
        progressInPercent,
    } = useOnMouseHold({
        intervalMs: 20,
        targetMs: 300,
    })

    React.useEffect(() => {
        if (isFinished) {
            onClickRemoveButton?.()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFinished])
    return (
        <div className={cn('flex bg-white p-5 gap-6', className)}>
            <CartItem.Image src={imageUrl} />
            <div className="flex-1">
                <CartItem.Info name={name} details={details} />
                <hr className="my-3" />
                <div className="flex items-center justify-between">
                    <CountButton
                        value={quantity}
                        onClick={onClickCountButton}
                    />
                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price} />
                        <div
                            onMouseDown={buttonPressDown}
                            onMouseUp={buttonPressUp}
                            onTouchStart={buttonPressDown}
                            onTouchEnd={buttonPressUp}
                            className="group w-8 h-8 flex justify-center items-center rounded-full overflow-hidden relative hover:bg-red-400/80 cursor-pointer"
                        >
                            <Trash2Icon
                                className={cn(
                                    'text-gray-400 cursor-pointer group-hover:text-white z-10'
                                )}
                                size={16}
                            />
                            <div
                                className={cn(
                                    `absolute left-0 right-0 bottom-0`,
                                    {
                                        [`bg-red-500/90 h-[${progressInPercent}%]`]:
                                            isPressed,
                                    }
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
