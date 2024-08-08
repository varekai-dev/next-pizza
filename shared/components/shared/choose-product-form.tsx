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
        'flex-col max-h-[70vh] scrollbar overflow-x-auto': isDrawer,
        'lg:flex-row flex-col': productPage,
      })}
    >
      <ProductImage src={imageUrl} alt={name} />
      <div
        className={cn('w-[490px] bg-[#f7f6f5] p-7', {
          'lg:w-[490px] w-full': isDrawer || productPage,
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
