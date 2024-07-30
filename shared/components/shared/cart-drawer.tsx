'use client'

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui'
import Link from 'next/link'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '@/shared/lib'
import { useCartStore } from '@/shared/store'
import { PizzaSize, PizzaType } from '@/shared/constants'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [
        fetchCartItems,
        totalAmount,
        items,
        updateItemQuantity,
        removeCartItem,
    ] = useCartStore(state => [
        state.fetchCartItems,
        state.totalAmount,
        state.items,
        state.updateItemQuantity,
        state.removeCartItem,
    ])

    React.useEffect(() => {
        fetchCartItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClickCountButton = (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuantity)
    }
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                    <SheetTitle>
                        In your cart{' '}
                        <span className="font-bold">
                            {items.length} item{items.length === 1 ? '' : 's'}
                        </span>
                    </SheetTitle>
                </SheetHeader>
                {/* Cart items */}
                <div className="-mx-6 mt-5 overflow-auto flex-1">
                    {items.map(item => (
                        <CartDrawerItem
                            key={item.id}
                            className="mb-2"
                            id={item.id}
                            imageUrl={
                                '/assets/products/pizza/peperoni-fresh.webp'
                            }
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            onClickCountButton={(type: 'plus' | 'minus') =>
                                handleClickCountButton(
                                    item.id,
                                    item.quantity,
                                    type
                                )
                            }
                            onClickRemoveButton={() => removeCartItem(item.id)}
                            details={
                                item.pizzaSize
                                    ? getCartItemDetails(
                                          item.ingredients,
                                          item.pizzaType as PizzaType,
                                          item.pizzaSize as PizzaSize
                                      )
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

                            <span className="font-bold text-lg">
                                {totalAmount} ₴
                            </span>
                        </div>
                        <Link href="/cart">
                            <Button
                                type="submit"
                                className="w-full h-12 text-base"
                            >
                                Make an order
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
