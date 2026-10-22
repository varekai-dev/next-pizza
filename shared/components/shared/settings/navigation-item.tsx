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
    <li className={cn('flex-1 md:my-2', className)}>
      <Link
        href={href}
        title={name}
        aria-label={name}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'flex h-11 select-none items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-secondary hover:text-primary md:h-auto md:justify-start md:gap-3 md:px-2 md:py-3 md:text-lg md:font-bold',
          {
            'pointer-events-none bg-secondary text-primary': isActive,
          },
        )}
      >
        <span className="[&>svg]:size-[22px] md:[&>svg]:size-[18px]">{icon}</span>
        <span className="hidden md:inline-block">{name}</span>
      </Link>
    </li>
  )
}
