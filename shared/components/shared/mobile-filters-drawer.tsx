import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Filters } from './filters'

interface Props {
    className?: string
}

export const MobileFilterDrawer: React.FC<React.PropsWithChildren<Props>> = ({
    className,
    children,
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="bg-[#fff] px-12">
                <React.Suspense>
                    <Filters />
                </React.Suspense>
            </SheetContent>
        </Sheet>
    )
}
