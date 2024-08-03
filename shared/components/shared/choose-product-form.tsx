'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'

interface Props {
    imageUrl: string
    name: string
    className?: string
    onClickAdd?: (values: CreateCartItemValues) => void
    productItemId: number
    price: number
    loading?: boolean
    isDrawer: boolean
    productPage?: boolean
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageUrl,
    onClickAdd,
    className,
    productItemId,
    price,
    loading,
    isDrawer,
    productPage,
}) => {
    const handleClickAddCart = () => {
        onClickAdd?.({
            productItemId,
        })
    }

    return (
        <div
            className={cn('flex flex-1', className, {
                'flex-col max-h-[70vh] scrollbar overflow-x-auto': isDrawer,
                'flex-col scrollbar overflow-x-auto': productPage,
            })}
        >
            <ProductImage src={imageUrl} alt={name} />
            <div
                className={cn('w-[490px] bg-[#f7f6f5] p-7', {
                    'w-full': isDrawer || productPage,
                })}
            >
                <Title text={name} />
                <Button
                    loading={loading}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    onClick={handleClickAddCart}
                >
                    Add to Cart {price} ₴
                </Button>
            </div>
        </div>
    )
}
