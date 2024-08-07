import React from 'react'
import { MobileFilterDrawer } from './mobile-filters-drawer'
import { Button } from '../ui'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/shared/lib'
import {
    DEFAULT_MAX_PRICE,
    DEFAULT_MIN_PRICE,
    GetSearchParams,
} from '@/shared/lib/find-categories'

interface Props {
    className?: string
    searchParams: GetSearchParams
}

export const MobileFilterButton: React.FC<Props> = ({
    className,
    searchParams,
}) => {
    const { sortBy, priceTo, priceFrom, ...rest } = searchParams
    const activeFiltersCount =
        Object.values(rest).length +
        (priceFrom && Number(priceFrom) !== DEFAULT_MIN_PRICE ? 1 : 0) +
        (priceTo && Number(priceTo) !== DEFAULT_MAX_PRICE ? 1 : 0)

    return (
        <MobileFilterDrawer
            activeFiltersCount={activeFiltersCount}
            searchParams={searchParams}
        >
            <Button variant="outline" className={cn('p-3 relative', className)}>
                {activeFiltersCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-primary size-5 rounded-full text-white text-xs flex items-center justify-center">
                        {activeFiltersCount}
                    </div>
                )}

                <SlidersHorizontal size={18} />
            </Button>
        </MobileFilterDrawer>
    )
}
