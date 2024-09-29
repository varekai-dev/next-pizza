'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'

import { Button } from '../ui'
import { ProductImage } from './product/product-image'
import { Title } from './title'

interface Props {
  imageUrl: string
  name: string
  className?: string
  onClickAdd?: (values: CreateCartItemValues) => void
  productItemId: string
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
        'scrollbar max-h-[70vh] flex-col overflow-x-auto': isDrawer,
        'flex-col lg:flex-row': productPage,
      })}
    >
      <ProductImage src={imageUrl} alt={name} isDrawer={isDrawer} />
      <div
        className={cn('w-[490px] bg-[#f7f6f5] p-7', {
          'w-full lg:w-[490px]': isDrawer || productPage,
        })}
      >
        <Title text={name} />
        <Button
          loading={loading}
          className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
          onClick={handleClickAddCart}
        >
          Add to Cart {price} ₴
        </Button>
      </div>
    </div>
  )
}
