import React from 'react'
import { UserRole } from '@prisma/client'

import { navList } from '@/shared/constants'
import { cn } from '@/shared/lib'

import { NavigationItem } from './navigation-item'

interface Props {
  className?: string
  role?: UserRole
}

export const SettingNavigation: React.FC<Props> = async ({ className, role }) => {
  return (
    <div
      className={cn(
        'sticky bottom-5 left-5 right-5 rounded-md bg-white md:relative md:bottom-auto md:left-auto md:right-auto md:min-w-[250px] md:p-5',
        className,
      )}
    >
      <ul className="flex h-[60px] w-full items-center md:block">
        {navList.map(({ name, isAdmin, href, icon }) => {
          if (role === UserRole.USER && isAdmin) {
            return
          }
          return <NavigationItem key={name} name={name} href={href} icon={icon} />
        })}
      </ul>
    </div>
  )
}
