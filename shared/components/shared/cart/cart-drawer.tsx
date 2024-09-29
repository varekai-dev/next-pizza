'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Root } from '@radix-ui/react-visually-hidden'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Route } from '@/@types'
import { PizzaSize, PizzaType } from '@/shared/constants'
import { useCart } from '@/shared/hooks'
import { cn, getCartItemDetails } from '@/shared/lib'

import { Button } from '../../ui'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/sheet'
import { Title } from '../title'
import { CartDrawerItem } from './cart-drawer-item'

type Props = {
  runFetch?: boolean
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, runFetch = true }) => {
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart(runFetch)

  const handleClickCountButton = (id: string, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={(value: boolean) => setSheetOpen(value)}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between bg-[#f4f1ee] pb-0">
        <div
          className={cn('flex h-full flex-col', {
            'justify-center': !totalAmount,
          })}
        >
          {/* Empty cart */}
          {!totalAmount && (
            <div className="mx-auto flex w-72 flex-col items-center justify-center">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="Empty cart" />
              <p className="mb-5 text-center text-neutral-500">Add some items to your cart</p>

              <Button className="h-12 w-56 text-base" size="lg" onClick={() => setSheetOpen(false)}>
                <ArrowLeft size={20} className="mr-2" />
                Turn back
              </Button>
            </div>
          )}
          {totalAmount === 0 && (
            <Root>
              <SheetTitle>Title</SheetTitle>
            </Root>
          )}
          {totalAmount > 0 && (
            <>
              <SheetHeader>
                <SheetTitle>
                  In your cart{' '}
                  <span className="font-bold">
                    {items.length} item
                    {items.length === 1 ? '' : 's'}
                  </span>
                </SheetTitle>
              </SheetHeader>
              {/* Cart items */}
              <div className="-mx-6 mt-5 flex-1 overflow-auto">
                {items.map((item) => (
                  <CartDrawerItem
                    disabled={item.disabled}
                    key={item.id}
                    className="mb-2"
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onClickCountButton={(type: 'plus' | 'minus') =>
                      handleClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemoveButton={() => removeCartItem(item.id)}
                    details={
                      item.pizzaSize
                        ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                        : ''
                    }
                  />
                ))}
              </div>
              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="mb-4 flex">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Total
                      <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
                    </span>

                    <span className="text-lg font-bold">{totalAmount} ₴</span>
                  </div>
                  <Link href={Route.CHECKOUT}>
                    <Button loading={loading} type="submit" className="h-12 w-full text-base">
                      Make an order
                      <ArrowRight className="ml-2 w-5" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
