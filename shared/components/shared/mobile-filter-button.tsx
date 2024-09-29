import React from 'react'
import { SlidersHorizontal } from 'lucide-react'

import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/shared/constants'
import { cn } from '@/shared/lib'
import { GetSearchParams } from '@/shared/services/categories'

import { Button } from '../ui'
import { MobileFilterDrawer } from './mobile-filters-drawer'

interface Props {
  className?: string
  searchParams: GetSearchParams
}

export const MobileFilterButton: React.FC<Props> = ({ className, searchParams }) => {
  const { priceTo, priceFrom, ...rest } = searchParams
  const activeFiltersCount =
    Object.values(rest).length +
    (priceFrom && Number(priceFrom) !== DEFAULT_MIN_PRICE ? 1 : 0) +
    (priceTo && Number(priceTo) !== DEFAULT_MAX_PRICE ? 1 : 0)

  return (
    <MobileFilterDrawer activeFiltersCount={activeFiltersCount} searchParams={searchParams}>
      <Button variant="outline" className={cn('relative p-3', className)}>
        {activeFiltersCount > 0 && (
          <div className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white">
            {activeFiltersCount}
          </div>
        )}

        <SlidersHorizontal size={18} />
      </Button>
    </MobileFilterDrawer>
  )
}
