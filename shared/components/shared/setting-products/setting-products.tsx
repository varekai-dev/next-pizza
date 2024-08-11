'use client'

import React from 'react'

import { useGetProducts } from '@/shared/hooks'

interface Props {
  className?: string
}

export const SettingProducts: React.FC<Props> = ({ className }) => {
  const { products } = useGetProducts()
  console.log('products', products)
  return <div className={className}></div>
}
