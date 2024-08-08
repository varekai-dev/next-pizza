import React from 'react'
import { Button, Popover } from '../ui'
import { PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/shared/lib'
import { navList } from '@/shared/constants'
import Link from 'next/link'
import { UserRole } from '@prisma/client'
import { signOut } from 'next-auth/react'

interface Props {
    className?: string
    role?: UserRole
    pathname: string
}

export const SettingPopup: React.FC<React.PropsWithChildren<Props>> = ({
    className,
    children,
    role,
    pathname,
}) => {
    const [open, setOpen] = React.useState(false)
    return (
        <Popover open={open} onOpenChange={isOpen => setOpen(isOpen)}>
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
                                        'flex items-center gap-2 hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md select-none font-semibold my-2',
                                        {
                                            'bg-secondary': isActive,
                                        }
                                    )}
                                >
                                    {icon} {name}
                                </li>
                            </Link>
                        )
                    })}
                </ul>
                <div className="flex-grow border-t border-gray-100 py-2" />
                <Button
                    className="w-full text-md"
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
