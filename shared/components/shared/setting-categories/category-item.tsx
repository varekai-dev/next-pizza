'use client'

import React from 'react'
import { Product } from '@prisma/client'
import { X } from 'lucide-react'

import { useDeleteCategory, useUpdateCategory } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { DeleteWrapper } from '../delete-button'
import { ImageCard } from '../image-card'
import { CategoryModal } from '../modals/category-modal'
import { Title } from '../title'
import { Tooltip } from '../tooltip'
import { CategoryFormValues } from './categoryFormSchema'

interface Props {
  className?: string
  categoryName: string
  categoryId: string
  products?: Product[]
}

export const CategoryItem: React.FC<Props> = ({ className, categoryName, categoryId, products }) => {
  const { updateCategory, isPending } = useUpdateCategory()
  const { deleteCategory } = useDeleteCategory()

  const handleSubmit = (values: CategoryFormValues) => {
    updateCategory({
      id: categoryId,
      data: {
        name: values.name,
      },
    })
  }

  const handleDelete = () => {
    deleteCategory(categoryId)
  }

  return (
    <div className={cn('bg-white rounded-md px-4 py-3 flex justify-between items-center gap-3', className)}>
      <Title text={categoryName} size="xs" className="font-bold" />
      <div className="flex gap-3 flex-1">
        {products?.map((product) => (
          <React.Fragment key={product.id}>
            <Tooltip content={product.name}>
              <div>
                <ImageCard srcUrl={product.imageUrl} alt={product.name} width={40} height={40} />
              </div>
            </Tooltip>
          </React.Fragment>
        ))}
      </div>
      <CategoryModal onSubmit={handleSubmit} isPending={isPending} categoryName={categoryName}>
        <Button variant="outline">Edit</Button>
      </CategoryModal>
      <DeleteWrapper onSubmit={handleDelete}>
        <X className="text-gray-400 cursor-pointer group-hover:text-white z-10" size={20} />
      </DeleteWrapper>
    </div>
  )
}