import React from 'react'
import { MobileFilterDrawer } from './mobile-filters-drawer'
import { Button } from '../ui'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/shared/lib'
import { GetSearchParams } from '@/shared/lib/find-pizzas'

interface Props {
    className?: string
    searchParams: GetSearchParams
}

export const MobileFilterButton: React.FC<Props> = ({
    className,
    searchParams,
}) => {
    const { sortBy, ...rest } = searchParams
    const activeFiltersCount = Object.values(rest).length

    return (
        <MobileFilterDrawer>
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
