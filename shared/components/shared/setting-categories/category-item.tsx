'use client'

import React from 'react'
import { Product } from '@prisma/client'

import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { ImageCard } from '../image-card'
import { CategoryModal } from '../modals/category-modal'
import { Title } from '../title'
import { Tooltip } from '../tooltip'

interface Props {
  className?: string
  categoryName: string
  categoryId: string
  products?: Product[]
}

export const CategoryItem: React.FC<Props> = ({ className, categoryName, categoryId, products }) => {
  return (
    <div className={cn('bg-white rounded-md px-4 py-3 flex justify-between items-center gap-3', className)}>
      <Title text={categoryName} size="xs" className="font-bold" />
      <div className="flex gap-3 flex-1">
        {products?.map((product) => (
          <React.Fragment key={product.id}>
            <Tooltip content={product.name}>
              <ImageCard srcUrl={product.imageUrl} alt={product.name} width={40} height={40} />
            </Tooltip>
          </React.Fragment>
        ))}
      </div>
      <CategoryModal categoryId={categoryId} categoryName={categoryName}>
        <Button variant="outline">Edit</Button>
      </CategoryModal>
    </div>
  )
}
