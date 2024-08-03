import React from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Filters } from './filters'
import { Root } from '@radix-ui/react-visually-hidden'
interface Props {
    className?: string
}

export const MobileFilterDrawer: React.FC<React.PropsWithChildren<Props>> = ({
    children,
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <Root>
                <SheetTitle>Title</SheetTitle>
            </Root>
            <SheetContent className="bg-[#fff] p-4 pb-[50px] pr-12 max-h-[100vh] overflow-scroll scrollbar">
                <React.Suspense>
                    <Filters />
                </React.Suspense>
            </SheetContent>
        </Sheet>
    )
}
