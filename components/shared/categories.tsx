'use client'
import { cn } from '@/lib/utils'
import { useCategoryActiveId } from '@/store'
import { Category } from '@prisma/client'
import React from 'react'

interface Props {
    className?: string
    items: Category[]
}

export const Categories: React.FC<Props> = ({ className, items }) => {
    const categoryActiveId = useCategoryActiveId()
    return (
        <div
            className={cn(
                'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl',
                className
            )}
        >
            {items.map(cat => {
                return (
                    <a
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5',
                            {
                                ['bg-white shadow-md shadow-gray-200 text-primary transition d']:
                                    categoryActiveId === cat.id,
                            }
                        )}
                        href={`/#${cat.name}`}
                        key={cat.id}
                    >
                        <button>{cat.name}</button>
                    </a>
                )
            })}
        </div>
    )
}
