'use client'

import React from 'react'

import { useCreateCategory, useGetCategories } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button, Skeleton } from '../../ui'
import { CategoryModal } from '../modals/category-modal'
import { CategoryItem } from './category-item'
import { CategoryFormValues } from './categoryFormSchema'

interface Props {
  className?: string
}

export const SettingCategories: React.FC<Props> = ({ className }) => {
  const { categories, isFetching } = useGetCategories()

  const { createCategory, isPending } = useCreateCategory()

  const handleCreateCategory = (values: CategoryFormValues) => {
    createCategory(values)
  }

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      {isFetching ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-[64px] w-full" />
          ))}
        </div>
      ) : (
        <>
          {categories?.map((category) => (
            <CategoryItem
              categoryName={category.name}
              categoryId={category.id}
              key={category.id}
              products={category.products}
            />
          ))}
          <CategoryModal onSubmit={handleCreateCategory} isPending={isPending}>
            <Button className="h-[64px] font-bold" variant="secondary">
              Create category
            </Button>
          </CategoryModal>
        </>
      )}
    </div>
  )
}
