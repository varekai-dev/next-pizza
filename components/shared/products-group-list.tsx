'use client'

import React from 'react'
import { Title } from './title'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'
import { useDebounce, useIntersection, usePrevious } from 'react-use'
import { useCategoryActiveId, useSetCategoryActiveId } from '@/store'

interface Props {
    title: string
    items: any[]
    className?: string
    listClassName?: string
    categoryId: number
    isPageScrolling: boolean
}

export const ProductsGroupList: React.FC<Props> = ({
    className,
    title,
    items,
    listClassName,
    categoryId,
    isPageScrolling,
}) => {
    const ref = React.createRef<HTMLDivElement>()
    const categoryActiveId = useCategoryActiveId()
    const setActiveCategoryId = useSetCategoryActiveId()
    const intersection = useIntersection(ref, {
        threshold: 1,
    })

    const prevCategoryActiveId = usePrevious(categoryActiveId)

    useDebounce(
        () => {
            if (
                categoryId === categoryActiveId &&
                prevCategoryActiveId !== categoryActiveId
            ) {
                ref.current?.scrollIntoView({
                    block: 'center',
                })
            }
        },
        300,
        [categoryActiveId]
    )

    React.useEffect(() => {
        if (intersection?.isIntersecting && !isPageScrolling) {
            setActiveCategoryId(categoryId)
        }
    }, [
        categoryId,
        setActiveCategoryId,
        intersection?.isIntersecting,
        isPageScrolling,
    ])
    return (
        <div ref={ref} className={className} id={title}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                        ingredients={product.ingredients}
                    />
                ))}
            </div>
        </div>
    )
}
