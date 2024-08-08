'use client'

import React from 'react'
import { ShoppingCart } from 'lucide-react'

import { useCart, useIsPageScrolling } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button } from '../ui'
import { CartDrawer } from './cart-drawer'

interface Props {
  className?: string
}

export const CartButtonFixed: React.FC<Props> = ({ className }) => {
  const { items, loading } = useCart()
  const { scrollY } = useIsPageScrolling()

  const show = scrollY > 150
  return (
    <CartDrawer runFetch={false}>
      <Button
        loading={loading}
        className={cn(
          'size-14 flex items-center gap-1 group-hover:opacity-0 fixed bottom-5 right-5 transition duration-300 translate-y-[600px] ',
          className,
          {
            'w-[56px]': loading,
            'translate-y-0': show,
          },
        )}
      >
        <ShoppingCart size={16} className="relative" strokeWidth={2} />
        <b>{items.length}</b>
      </Button>
    </CartDrawer>
  )
}
