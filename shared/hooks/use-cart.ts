'use client'

import React from 'react'
import debounce from 'lodash.debounce'

import { useCartStore } from '@/shared/store/cart'

import { CartStateItem } from '../lib/get-cart-details'
import { CreateCartItemValues } from '../services/dto/cart.dto'

type ReturnProps = {
  totalAmount: number
  items: CartStateItem[]
  loading: boolean
  updateItemQuantity: (id: string, quantity: number) => void
  removeCartItem: (id: string) => void
  addCartItem: (values: CreateCartItemValues) => void
  clearCart: () => void
}

export const useCart = (runFetch?: boolean): ReturnProps => {
  const [totalAmount, items, fetchCartItems, loading, addCartItem, updateItemQuantity, removeCartItem, clearCart] =
    useCartStore((state) => [
      state.totalAmount,
      state.items,
      state.fetchCartItems,
      state.loading,
      state.addCartItem,
      debounce(state.updateItemQuantity, 200),
      state.removeCartItem,
      state.clearCart,
    ])

  React.useEffect(() => {
    if (runFetch && !items.length) {
      fetchCartItems()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    totalAmount,
    items,
    loading,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
    clearCart,
  }
}
