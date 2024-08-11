'use client'

import React from 'react'

import { useGetCategories } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { CategoryParams } from '@/shared/services/categories'

import { Button, Skeleton } from '../../ui'
import { CategoryItem } from './category-item'

interface Props {
  className?: string
}

export const SettingCategories: React.FC<Props> = ({ className }) => {
  const params: CategoryParams = {
    include: {
      products: true,
    },
  }
  const { categories, isFetching } = useGetCategories({ params })

  return (
    <div className={cn('w-full flex flex-col gap-3', className)}>
      {isFetching ? (
        <div className="flex gap-3 flex-col">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-[64px] w-full" />
          ))}
        </div>
      ) : (
        <>
          {categories?.map((category) => (
            <CategoryItem name={category.name} id={category.id} key={category.id} products={category.products} />
          ))}
          <Button className="h-[64px] font-bold text-md" variant="secondary">
            Create category
          </Button>
        </>
      )}
    </div>
  )
}
