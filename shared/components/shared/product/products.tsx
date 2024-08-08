'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'
import { useIsPageScrolling } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { findCategories, GetSearchParams } from '@/shared/lib/find-categories'

import { ProductsGroupList } from './products-group-list'

interface Props {
  className?: string
  searchParams: GetSearchParams
}

export const Products: React.FC<Props> = ({ className, searchParams }) => {
  const { isScrolling } = useIsPageScrolling()
  const { data: categories } = useQuery({
    queryKey: [QueryKey.CATEGORIES],
    queryFn: () => findCategories(searchParams),
  })
  return (
    <div className={cn('flex-1', className)}>
      <div className="flex flex-col gap-16">
        {categories?.map((category) => {
          if (!category.products.length) return null
          return (
            <React.Suspense key={category.id}>
              <ProductsGroupList
                isPageScrolling={isScrolling}
                items={category.products}
                title={category.name}
                categoryId={category.id}
              />
            </React.Suspense>
          )
        })}
      </div>
    </div>
  )
}
