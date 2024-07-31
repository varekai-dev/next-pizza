import { create } from 'zustand'
import { Api } from '../services/api-client'
import { getCartDetails } from '../lib'
import { CartStateItem } from '../lib/get-cart-details'
import { CreateCartItemValues } from '../services/dto/cart.dto'

interface State {
    loading: boolean
    error: boolean
    totalAmount: number
    items: CartStateItem[]
    fetchCartItems: () => Promise<void>
    updateItemQuantity: (id: number, quantity: number) => Promise<void>
    addCartItem: (values: CreateCartItemValues) => Promise<void>
    removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<State>()(set => ({
    loading: false,
    error: false,
    totalAmount: 0,
    items: [],
    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.getCart()
            set(getCartDetails(data))
        } catch (error) {
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
    removeCartItem: async (id: number) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.deleteItem(id)
            set(getCartDetails(data))
        } catch (error) {
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.updateItemQuantity(id, quantity)
            set(getCartDetails(data))
        } catch (error) {
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.createCartItem(values)
            set(getCartDetails(data))
        } catch (error) {
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
}))
