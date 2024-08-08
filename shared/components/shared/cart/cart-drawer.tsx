'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Root } from '@radix-ui/react-visually-hidden'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <div
          className={cn('flex flex-col h-full', {
            'justify-center': !totalAmount,
          })}
        >
          {/* Empty cart */}
          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="Empty cart" />
              <p className="text-center text-neutral-500 mb-5">Add some items to your cart</p>

              <Button className="w-56 h-12 text-base" size="lg" onClick={() => setSheetOpen(false)}>
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
              <div className="-mx-6 mt-5 overflow-auto flex-1">
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
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Total
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₴</span>
                  </div>
                  <Link href="/checkout">
                    <Button loading={loading} type="submit" className="w-full h-12 text-base">
                      Make an order
                      <ArrowRight className="w-5 ml-2" />
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
