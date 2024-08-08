import React from 'react'
import { Ingredient, ProductItem } from '@prisma/client'

import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'

import { Title } from './title'

interface Props {
  imageUrl: string
  name: string
  className?: string
  ingredients: Ingredient[]
  items: ProductItem[]
  onClickAdd?: (values: CreateCartItemValues) => void
  loading?: boolean
}

export const ChoosePizzaMobileForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
  loading,
}) => {
  return (
    <div className={className}>
      <Title text={name} />
    </div>
  )
}
