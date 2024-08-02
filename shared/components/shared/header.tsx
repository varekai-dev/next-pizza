import { cn } from '@/shared/lib/utils'
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui'
import { Container } from './container'
import { User } from 'lucide-react'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'

interface Props {
    className?: string
    hasSearch?: boolean
    hasCart?: boolean
}

export const Header: React.FC<Props> = ({
    className,
    hasSearch = true,
    hasCart = true,
}) => {
    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                {/* Left part */}
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo.png"
                            width={35}
                            height={35}
                            alt="logo"
                        />
                        <div>
                            <h1 className="text-2xl uppercase font-black">
                                Next Pizza
                            </h1>
                            <p className="text-sm text-gray-400 leading-3">
                                Taste awesome
                            </p>
                        </div>
                    </div>
                </Link>
                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                {/* Right part */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-3"
                    >
                        <User size={16} />
                        Login
                    </Button>
                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    )
}
