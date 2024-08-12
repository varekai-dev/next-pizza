'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'
import { cn } from '@/shared/lib'
import { Api } from '@/shared/services/api-client'
import { GetSearchParams } from '@/shared/services/categories'

import { ProductsGroupList } from './products-group-list'

interface Props {
  className?: string
  searchParams: GetSearchParams
}

export const Products: React.FC<Props> = ({ className, searchParams }) => {
  const { data: categories } = useQuery({
    queryKey: [QueryKey.GET_CATEGORIES, searchParams],
    queryFn: () => Api.categories.getAll({ params: searchParams }),
  })

  return (
    <div className={cn('flex-1', className)}>
      <div className="flex flex-col gap-16">
        {categories?.map((category) => {
          if (!category.products?.length) return null
          return (
            <React.Suspense key={category.id}>
              <ProductsGroupList items={category.products} title={category.name} categoryId={category.id} />
            </React.Suspense>
          )
        })}
      </div>
    </div>
  )
}
