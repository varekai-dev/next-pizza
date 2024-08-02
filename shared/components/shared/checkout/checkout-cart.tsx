import { PizzaType, PizzaSize } from '@/shared/constants'
import { getCartItemDetails } from '@/shared/lib'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { CartItem } from '../cart-item'
import { CartItemSkeleton } from '../skeletons/cart-item-skeleton'
import { WhiteBlock } from '../white-block'
import { CartStateItem } from '@/shared/lib/get-cart-details'

interface Props {
    items: CartStateItem[]
    className?: string
    totalAmount: number
    loading: boolean
    clearCart: () => void
    removeCartItem: (id: number) => void
    onClickCountButton: (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => void
}

export const CheckoutCart: React.FC<Props> = ({
    className,
    loading,
    items,
    totalAmount,
    clearCart,
    removeCartItem,
    onClickCountButton,
}) => {
    return (
        <WhiteBlock
            title="1. Cart"
            endAdornment={
                totalAmount > 0 && (
                    <button
                        className="flex items-center gap-2 text-gray-400 hover:text-gray-600"
                        onClick={clearCart}
                    >
                        <Trash2 size={18} />
                        Clear cart
                    </button>
                )
            }
            className={className}
        >
            <div className="flex flex-col gap-5">
                {loading
                    ? [...Array(items?.length || 3)].map((_, index) => (
                          <CartItemSkeleton key={index} />
                      ))
                    : items?.map(item => (
                          <CartItem
                              id={item.id}
                              details={
                                  item.pizzaSize
                                      ? getCartItemDetails(
                                            item.ingredients,
                                            item.pizzaType as PizzaType,
                                            item.pizzaSize as PizzaSize
                                        )
                                      : ''
                              }
                              key={item.id}
                              name={item.name}
                              imageUrl={item.imageUrl}
                              price={item.price}
                              quantity={item.quantity}
                              onClickRemove={() => {
                                  removeCartItem(item.id)
                              }}
                              onClickCountButton={type =>
                                  onClickCountButton(
                                      item.id,
                                      item.quantity,
                                      type
                                  )
                              }
                          />
                      ))}
            </div>

            {!totalAmount && items && (
                <p className="text-center text-gray-400 p-10">Cart is empty</p>
            )}
        </WhiteBlock>
    )
}
