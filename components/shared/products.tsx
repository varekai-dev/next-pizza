'use client'

import React from 'react'
import { Category, Product } from '@prisma/client'
import { ProductsGroupList } from './products-group-list'
import { useIsPageScrolling } from '@/hooks'

interface Props {
    className?: string
    categories: (Category & { products: Product[] })[]
}

export const Products: React.FC<Props> = ({ className, categories }) => {
    const isPageScrolling = useIsPageScrolling()
    return (
        <div className="flex-1">
            <div className="flex flex-col gap-16">
                {categories.map(category => {
                    return (
                        <ProductsGroupList
                            isPageScrolling={isPageScrolling}
                            key={category.id}
                            items={category.products}
                            title={category.name}
                            categoryId={category.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}
