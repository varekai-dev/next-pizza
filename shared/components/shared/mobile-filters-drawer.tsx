import React from 'react'
import { Root } from '@radix-ui/react-visually-hidden'

import { GetSearchParams } from '@/shared/lib/find-categories'

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
      <SheetContent className="bg-[#fff] pt-4 pl-8 pb-[50px] pr-12 max-h-[100vh] overflow-x-scroll scrollbar">
        <React.Suspense>
          <Filters activeFiltersCount={activeFiltersCount} searchParams={searchParams} />
        </React.Suspense>
      </SheetContent>
    </Sheet>
  )
}
