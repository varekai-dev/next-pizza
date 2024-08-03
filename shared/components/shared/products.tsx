'use client'

import React, { Suspense } from 'react'
import { Category, Product } from '@prisma/client'
import { ProductsGroupList } from './products-group-list'
import { useIsPageScrolling } from '@/shared/hooks'
import { ProductWithRelations } from '@/@types/prisma'
import { cn } from '@/shared/lib'

interface Props {
    className?: string
    categories: (Category & { products: ProductWithRelations[] })[]
}

export const Products: React.FC<Props> = ({ className, categories }) => {
    const { isScrolling } = useIsPageScrolling()
    return (
        <div className={cn('flex-1', className)}>
            <Suspense>
                <div className="flex flex-col gap-16">
                    {categories.map(category => {
                        if (!category.products.length) return null
                        return (
                            <ProductsGroupList
                                isPageScrolling={isScrolling}
                                key={category.id}
                                items={category.products}
                                title={category.name}
                                categoryId={category.id}
                            />
                        )
                    })}
                </div>
            </Suspense>
        </div>
    )
}
