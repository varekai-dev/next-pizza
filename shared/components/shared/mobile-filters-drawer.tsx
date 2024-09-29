import React from 'react'
import { Root } from '@radix-ui/react-visually-hidden'

import { GetSearchParams } from '@/shared/services/categories'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Filters } from './filters'

interface Props {
  className?: string
  activeFiltersCount: number
  searchParams: GetSearchParams
}

export const MobileFilterDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  activeFiltersCount,
  searchParams,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <Root>
        <SheetTitle>Title</SheetTitle>
      </Root>
      <SheetContent className="scrollbar max-h-screen overflow-x-scroll bg-white pb-[50px] pl-8 pr-12 pt-4">
        <React.Suspense>
          <Filters activeFiltersCount={activeFiltersCount} searchParams={searchParams} />
        </React.Suspense>
      </SheetContent>
    </Sheet>
  )
}
