'use client'

import React from 'react'

import { useUpdateIngredient } from '@/shared/hooks'
import { useGetProduct } from '@/shared/hooks/use-get-product'

import { SettingProductForm } from './setting-product-form'

interface Props {
  className?: string
  id: string
}

export const SettingProduct: React.FC<Props> = ({ className, id }) => {
  const { product } = useGetProduct({
    id,
    params: {
      include: ['items', 'ingredients'],
    },
  })
  const { updateIngredient, isPending } = useUpdateIngredient()

  const handleSubmit = (data: FormData) => {
    updateIngredient({
      id: id,
      payload: data,
    })
  }

  return (
    <div className={className}>
      {product && (
        <SettingProductForm
          isPending={isPending}
          handleSubmit={handleSubmit}
          defaultValues={{
            name: product?.name,
            // price: String(product?.price),
            imageUrl: product?.imageUrl,
          }}
        />
      )}
    </div>
  )
}
