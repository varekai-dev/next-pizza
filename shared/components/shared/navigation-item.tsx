'use client'

import { cn } from '@/shared/lib'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
    className?: string
    icon: React.ReactNode
    name: string
    href: string
}

export const NavigationItem: React.FC<Props> = ({
    className,
    icon,
    name,
    href,
}) => {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <Link href={href}>
            <li
                className={cn(
                    'px-4 md:py-3 md:px-2 text-gray-500 font-semibold text-lg flex items-center gap-3 cursor-pointer select-none',
                    className,
                    {
                        'bg-secondary rounded-md font-bold cursor-auto':
                            isActive,
                    }
                )}
            >
                <div
                    className={cn('md:scale-100 scale-150', {
                        'text-primary': isActive,
                    })}
                >
                    {icon}
                </div>
                <span className="md:inline-block hidden">{name}</span>
            </li>
        </Link>
    )
}
