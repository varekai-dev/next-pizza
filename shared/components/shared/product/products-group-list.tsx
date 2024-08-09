'use client'

import React from 'react'
import { useFirstMountState, useIntersection, usePrevious } from 'react-use'
import { useSearchParams } from 'next/navigation'
import { ProductItem } from '@prisma/client'

import { Sort } from '@/@types'
import { ProductWithRelations } from '@/@types/prisma'
import { cn } from '@/shared/lib/utils'
import { useCategoryActiveId, useSetCategoryActiveId } from '@/shared/store'

import { Title } from '../title'
import { ProductCard } from './product-card'

interface Props {
  title: string
  items: ProductWithRelations[]
  className?: string
  listClassName?: string
  categoryId: string
  isPageScrolling: boolean
}

export const ProductsGroupList: React.FC<Props> = ({
  className,
  title,
  items,
  listClassName,
  categoryId,
  isPageScrolling,
}) => {
  const searchParams = useSearchParams()
  const isFirstMount = useFirstMountState()
  const ref = React.createRef<HTMLDivElement>()
  const { categoryActiveId, shouldScroll } = useCategoryActiveId()
  const setActiveCategoryId = useSetCategoryActiveId()
  const intersection = useIntersection(ref, {
    threshold: 0.4,
  })

  const sortBy = searchParams.get('sortBy')

  // Sort on frontend because prisma doesn't support sorting by nested fields
  const sortedItems = (() => {
    if (sortBy === Sort.EXPENSIVE) {
      return items.sort((a, b) => b.items[b.items.length - 1].price - a.items[a.items.length - 1].price)
    }
    if (sortBy === Sort.CHEAP) {
      items.sort((a, b) => a.items[0].price - b.items[0].price)
    }
    return items
  })()

  const prevCategoryActiveId = usePrevious(categoryActiveId)

  React.useEffect(() => {
    if (categoryId === categoryActiveId && prevCategoryActiveId !== categoryActiveId && shouldScroll && !isFirstMount) {
      ref.current?.scrollIntoView({
        block: 'center',
      })
    }
  }, [ref, categoryActiveId, prevCategoryActiveId, shouldScroll, categoryId, isFirstMount])

  React.useEffect(() => {
    if (intersection?.isIntersecting && !isPageScrolling) {
      setActiveCategoryId(categoryId, false)
    }
  }, [categoryId, setActiveCategoryId, intersection?.isIntersecting, isPageScrolling])
  return (
    <div ref={ref} className={className} id={title}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-1 gap-[50px] md:grid-cols-3', listClassName)}>
        {sortedItems.map((product) => (
          <ProductCard
            key={product.id}
            isPizza={!!product.items[0].pizzaType}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={Math.min(...product.items.map((item: ProductItem) => item.price))}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  )
}
