'use client'

import React from 'react'

import { SettingProductForm } from './setting-product-form'

interface Props {
  className?: string
}

export const CreateProduct: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <SettingProductForm isPending={false} handleSubmit={() => {}} empty />
    </div>
  )
}
