'use client'

import React from 'react'

import { ProductWithRelations } from '@/@types/prisma'
import { useBreakpoint } from '@/shared/hooks'

import { ProductModal } from '../modals/product-modal'
import { ProductDrawer } from './product-drawer'

interface Props {
  className?: string
  product: ProductWithRelations
}

export const Product: React.FC<Props> = ({ className, product }) => {
  const isLg = useBreakpoint('lg')
  return (
    <div className={className}>{isLg ? <ProductModal product={product} /> : <ProductDrawer product={product} />}</div>
  )
}
