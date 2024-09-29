'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/shared/lib'

interface Props {
  className?: string
  icon: React.ReactNode
  name: string
  href: string
}

export const NavigationItem: React.FC<Props> = ({ className, icon, name, href }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <Link
      className={cn({
        'pointer-events-none': isActive,
      })}
      href={href}
    >
      <li
        className={cn(
          'my-2 flex cursor-pointer select-none items-center gap-3 px-4 text-lg font-bold text-gray-500 hover:bg-secondary hover:text-primary md:px-2 md:py-3',
          className,
          {
            'rounded-md bg-secondary': isActive,
          },
        )}
      >
        <div className={cn('scale-150 md:scale-100', {})}>{icon}</div>
        <span className="hidden md:inline-block">{name}</span>
      </li>
    </Link>
  )
}
