import React from 'react'
import { MobileFilterDrawer } from './mobile-filters-drawer'
import { Button } from '../ui'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/shared/lib'

interface Props {
    className?: string
}

export const MobileFilterButton: React.FC<Props> = ({ className }) => {
    return (
        <MobileFilterDrawer>
            <Button className={cn('p-3', className)}>
                <SlidersHorizontal size={18} />
            </Button>
        </MobileFilterDrawer>
    )
}
