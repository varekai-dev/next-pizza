'use client'

import debounce from 'lodash.debounce'
import { useCartStore } from '@/shared/store/cart'
import React from 'react'
import { CreateCartItemValues } from '../services/dto/cart.dto'
import { CartStateItem } from '../lib/get-cart-details'

type ReturnProps = {
    totalAmount: number
    items: CartStateItem[]
    loading: boolean
    updateItemQuantity: (id: number, quantity: number) => void
    removeCartItem: (id: number) => void
    addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (runFetch?: boolean): ReturnProps => {
    const [
        totalAmount,
        items,
        fetchCartItems,
        loading,
        addCartItem,
        updateItemQuantity,
        removeCartItem,
    ] = useCartStore(state => [
        state.totalAmount,
        state.items,
        state.fetchCartItems,
        state.loading,
        state.addCartItem,
        debounce(state.updateItemQuantity, 200),
        state.removeCartItem,
    ])

    React.useEffect(() => {
        if (runFetch) {
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
    }
}
