'use client'

import React from 'react'
import { Category } from '@prisma/client'
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
            <div className="flex flex-col gap-16">
                {categories.map(category => {
                    if (!category.products.length) return null
                    return (
                        <React.Suspense key={category.id}>
                            <ProductsGroupList
                                isPageScrolling={isScrolling}
                                items={category.products}
                                title={category.name}
                                categoryId={category.id}
                            />
                        </React.Suspense>
                    )
                })}
            </div>
        </div>
    )
}
