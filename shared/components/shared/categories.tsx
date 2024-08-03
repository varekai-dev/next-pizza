'use client'
import { useElasticTransition } from '@/shared/hooks'
import { cn } from '@/shared/lib/utils'
import { useCategoryActiveId, useSetCategoryActiveId } from '@/shared/store'
import { Category } from '@prisma/client'
import React from 'react'

interface Props {
    className?: string
    items: Category[]
}

export const Categories: React.FC<Props> = ({ className, items }) => {
    const { categoryActiveId } = useCategoryActiveId()
    const setCategoryActiveId = useSetCategoryActiveId()

    const { refs, activeWidth, activeOffset } = useElasticTransition({
        activeEl: categoryActiveId,
        items,
    })

    return (
        <div
            className={cn(
                'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl relative max-w-[800px] overflow-x-auto ',
                className
            )}
        >
            {items.map((cat, index) => {
                return (
                    <div
                        ref={el => {
                            refs.current[index] = el
                        }}
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5'
                        )}
                        key={cat.id}
                    >
                        <button
                            className="z-10"
                            onClick={() => setCategoryActiveId(cat.id, true)}
                        >
                            {cat.name}
                        </button>
                    </div>
                )
            })}
            <div
                className="shadow-md shadow-gray-200 absolute bg-white h-11 rounded-2xl transition duration-300"
                style={{
                    width: `${activeWidth}px`,
                    transform: `translateX(${activeOffset}px)`,
                }}
            />
        </div>
    )
}
