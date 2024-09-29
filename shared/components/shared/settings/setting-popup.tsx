import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { UserRole } from '@prisma/client'

import { navList } from '@/shared/constants'
import { cn } from '@/shared/lib'

import { Button, Popover } from '../../ui'
import { PopoverContent, PopoverTrigger } from '../../ui/popover'

interface Props {
  className?: string
  role?: UserRole
  pathname: string
}

export const SettingPopup: React.FC<React.PropsWithChildren<Props>> = ({ className, children, role, pathname }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className={cn('w-[240px]', className)}>
        <ul>
          {navList.map(({ href, name, icon, isAdmin }) => {
            if (isAdmin && role !== UserRole.ADMIN) {
              return null
            }
            const isActive = pathname === href
            return (
              <Link
                className={cn({
                  'pointer-events-none': isActive,
                })}
                key={name}
                href={href}
                onClick={() => setOpen(false)}
              >
                <li
                  className={cn(
                    'my-2 flex cursor-pointer select-none items-center gap-2 rounded-md p-2 px-4 font-semibold hover:bg-secondary hover:text-primary',
                    {
                      'bg-secondary': isActive,
                    },
                  )}
                >
                  {icon} {name}
                </li>
              </Link>
            )
          })}
        </ul>
        <div className="grow border-t border-gray-100 py-2" />
        <Button
          className="w-full"
          variant="secondary"
          onClick={() =>
            signOut({
              callbackUrl: '/',
            })
          }
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  )
}
