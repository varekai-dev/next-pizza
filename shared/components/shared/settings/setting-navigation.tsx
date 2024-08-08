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
        'md:w-[300px] bg-white rounded-md md:p-5 md:relative sticky bottom-5 left-5 right-5 md:bottom-auto md:left-auto md:right-auto',
        className,
      )}
    >
      <ul className="w-full md:block flex h-[60px] items-center ">
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
