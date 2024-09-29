'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'
import { useElasticTransition } from '@/shared/hooks'
import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-client'
import { GetSearchParams } from '@/shared/services/categories'
import { useCategoryActiveId, useSetCategoryActiveId } from '@/shared/store'

interface Props {
  className?: string
  searchParams: GetSearchParams
}

export const Categories: React.FC<Props> = ({ className, searchParams }) => {
  const { categoryActiveId } = useCategoryActiveId()
  const setCategoryActiveId = useSetCategoryActiveId()

  const { data: categories } = useQuery({
    queryKey: [QueryKey.GET_CATEGORIES, searchParams],
    queryFn: () => Api.categories.getAll({ params: searchParams }),
    enabled: !!searchParams,
  })

  const { refs, activeWidth, activeOffset } = useElasticTransition({
    activeEl: categoryActiveId,
    items: categories || [],
  })

  return (
    <div
      className={cn(
        'relative inline-flex gap-1 overflow-x-scroll rounded-2xl bg-gray-50 p-1 md:overflow-hidden',
        className,
      )}
    >
      {categories?.map((cat, index) => {
        return (
          <div
            ref={(el) => {
              refs.current[index] = el
            }}
            className={cn('flex h-11 items-center rounded-2xl px-5 font-bold')}
            key={cat.id}
          >
            <button className="z-10" onClick={() => setCategoryActiveId(cat.id, true)}>
              {cat.name}
            </button>
          </div>
        )
      })}
      <div
        className="absolute h-11 rounded-2xl bg-white shadow-md shadow-gray-200 transition duration-300"
        style={{
          width: `${activeWidth}px`,
          transform: `translateX(${activeOffset}px)`,
        }}
      />
    </div>
  )
}
