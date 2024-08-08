'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/@types'
import { useElasticTransition } from '@/shared/hooks'
import { findCategories, GetSearchParams } from '@/shared/lib/find-categories'
import { cn } from '@/shared/lib/utils'
import { useCategoryActiveId, useSetCategoryActiveId } from '@/shared/store'

interface Props {
  className?: string
  searchParams: GetSearchParams
}

export const Categories: React.FC<Props> = ({ className, searchParams }) => {
  const { categoryActiveId } = useCategoryActiveId()
  const setCategoryActiveId = useSetCategoryActiveId()
  const { data: categories } = useQuery({
    queryKey: [QueryKey.CATEGORIES],
    queryFn: () => findCategories(searchParams),
  })

  const { refs, activeWidth, activeOffset } = useElasticTransition({
    activeEl: categoryActiveId,
    items: categories || [],
  })

  return (
    <div
      className={cn(
        'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl relative overflow-x-scroll md:overflow-hidden',
        className,
      )}
    >
      {categories?.map((cat, index) => {
        return (
          <div
            ref={(el) => {
              refs.current[index] = el
            }}
            className={cn('flex items-center font-bold h-11 rounded-2xl px-5')}
            key={cat.id}
          >
            <button className="z-10" onClick={() => setCategoryActiveId(cat.id, true)}>
              {cat.name}
            </button>
          </div>
        )
      })}
      <div
        className="shadow-md shadow-gray-200 absolute bg-white h-11 rounded-2xl transition duration-300"
        style={{
          width: `${activeWidth}px`,
          transform: `translateX(${activeOffset}px)`,
        }}
      />
    </div>
  )
}
