'use client'

import React from 'react'
import { ShoppingCart } from 'lucide-react'

import { useCart, useIsPageScrolling } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
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
          'fixed bottom-5 right-5 flex size-14 translate-y-[600px] items-center gap-1 transition duration-300 group-hover:opacity-0',
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
