'use client'
import { cn } from '@/lib/utils'
import { useCategoryActiveId } from '@/store'
import React from 'react'

interface Props {
    className?: string
}

const cats = [
    { name: 'Pizza', id: 1 },
    { name: 'Combo', id: 2 },
    { name: 'Appetizers', id: 3 },
    { name: 'Cocktails', id: 4 },
    { name: 'Coffee', id: 5 },
    { name: 'Drinks', id: 6 },
    { name: 'Desserts', id: 7 },
]

export const Categories: React.FC<Props> = ({ className }) => {
    const categoryActiveId = useCategoryActiveId()
    return (
        <div
            className={cn(
                'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl',
                className
            )}
        >
            {cats.map(cat => {
                return (
                    <a
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5',
                            {
                                ['bg-white shadow-md shadow-gray-200 text-primary']:
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
