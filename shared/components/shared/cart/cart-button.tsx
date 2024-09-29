'use client'

import React from 'react'
import { ArrowRight, ShoppingCart } from 'lucide-react'

import { useCart } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { CartDrawer } from './cart-drawer'

interface Props {
  className?: string
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const { totalAmount, items, loading } = useCart()

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn('group relative', className, {
          'w-[105px]': loading,
        })}
      >
        <b>{totalAmount} ₴</b>
        <span className="mx-3 h-full w-[1px] bg-white/30" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length} </b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Button>
    </CartDrawer>
  )
}
