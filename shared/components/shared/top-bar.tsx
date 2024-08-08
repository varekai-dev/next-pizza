import React from 'react'

import { GetSearchParams } from '@/shared/lib/find-categories'
import { cn } from '@/shared/lib/utils'

import { Categories } from './categories'
import { Container } from './container'
import { MobileFilterButton } from './mobile-filter-button'
import { SortPopup } from './sort-popup'

interface Props {
  className?: string
  searchParams: GetSearchParams
}

export const TopBar: React.FC<Props> = ({ className, searchParams }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex justify-between gap-5 items-center">
        <Categories searchParams={searchParams} />
        <SortPopup searchParams={searchParams} className="hidden lg:flex" />
        <MobileFilterButton className="block lg:hidden" searchParams={searchParams} />
      </Container>
    </div>
  )
}
