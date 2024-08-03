'use client'

import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Button } from '../ui'
import { cn } from '@/shared/lib'
import { CartDrawer } from './cart-drawer'
import { useCart, useIsPageScrolling } from '@/shared/hooks'

interface Props {
    className?: string
}

export const CartButtonFixed: React.FC<Props> = ({ className }) => {
    const { items, loading } = useCart()
    const { scrollY } = useIsPageScrolling()

    const show = scrollY > 150
    return (
        <CartDrawer>
            <div
                className={cn(   
                    'fixed bottom-5 right-5 transition duration-300 translate-y-[600px]',
                    {
                        'translate-y-0': show,
                    }
                )}
            >
                <Button
                    loading={loading}
                    className={cn('size-14', className, {
                        'w-[56px]': loading,
                    })}
                >
                    <div className="flex items-center gap-1 transition duration-500 group-hover:opacity-0 ">
                        <ShoppingCart
                            size={16}
                            className="relative"
                            strokeWidth={2}
                        />
                        <b>{items.length}</b>
                    </div>
                </Button>
            </div>
        </CartDrawer>
    )
}
