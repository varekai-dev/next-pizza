import React from 'react'
import { Categories } from './categories'
import { SortPopup } from './sort-popup'
import { cn } from '@/shared/lib/utils'
import { Container } from './container'
import { Category } from '@prisma/client'
import { GetSearchParams } from '@/shared/lib/find-pizzas'

interface Props {
    className?: string
    categories: Category[]
    searchParams: GetSearchParams
}

export const TopBar: React.FC<Props> = ({
    className,
    categories,
    searchParams,
}) => {
    return (
        <div
            className={cn(
                'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
                className
            )}
        >
            <Container className="flex justify-between items-center">
                <Categories items={categories} />
                <SortPopup searchParams={searchParams} />
            </Container>
        </div>
    )
}
