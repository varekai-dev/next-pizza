import React from 'react'
import { Trash2 } from 'lucide-react'

import { PizzaSize, PizzaType } from '@/shared/constants'
import { useCart } from '@/shared/hooks'
import { getCartItemDetails } from '@/shared/lib'

import { CartItem } from '../cart'
import { CartItemSkeleton } from '../skeletons/cart-item-skeleton'
import { WhiteBlock } from '../white-block'

interface Props {
  className?: string
}

export const CheckoutCart: React.FC<Props> = ({ className }) => {
  const { items, loading, totalAmount, removeCartItem, updateItemQuantity, clearCart } = useCart(true)

  const onClickCountButton = (id: string, quantity: number, type: 'plus' | 'minus') => {
    const value = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, value)
  }
  return (
    <WhiteBlock
      title="1. Cart"
      endAdornment={
        totalAmount > 0 && (
          <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600" onClick={clearCart}>
            <Trash2 size={18} />
            Clear cart
          </button>
        )
      }
      className={className}
    >
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(items?.length || 3)].map((_, index) => <CartItemSkeleton key={index} />)
          : items?.map((item) => (
              <CartItem
                id={item.id}
                details={
                  item.pizzaSize
                    ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
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
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              />
            ))}
      </div>

      {totalAmount === 0 && !loading && <p className="text-center text-gray-400 p-10">Cart is empty</p>}
    </WhiteBlock>
  )
}
