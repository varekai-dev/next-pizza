import { create } from 'zustand'

import { getCartDetails } from '../lib'
import { CartStateItem } from '../lib/get-cart-details'
import { Api } from '../services/api-client'
import { CreateCartItemValues } from '../services/dto/cart.dto'

interface State {
  loading: boolean
  error: boolean
  totalAmount: number
  items: CartStateItem[]
  fetchCartItems: () => Promise<void>
  updateItemQuantity: (id: string, quantity: number) => Promise<void>
  addCartItem: (values: CreateCartItemValues) => Promise<void>
  removeCartItem: (id: string) => Promise<void>
  clearCart: () => void
}

export const useCartStore = create<State>()((set) => ({
  loading: false,
  error: false,
  totalAmount: 0,
  items: [],
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.getCart()
      if (data) {
        set(getCartDetails(data))
      }
    } catch (error) {
      console.log('error', error)
      throw new Error('Could not fetch cart items')
    } finally {
      set({ loading: false })
    }
  },
  removeCartItem: async (id: string) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
      }))
      const data = await Api.cart.deleteItem(id)
      set(getCartDetails(data))
    } catch (error) {
      console.log('error', error)
      throw new Error('Could not remove item from cart')
    } finally {
      set({ loading: false })
    }
  },
  updateItemQuantity: async (id: string, quantity: number) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.updateItemQuantity(id, quantity)
      set(getCartDetails(data))
    } catch (error) {
      console.log('error', error)
      throw new Error('Could not update item quantity')
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
      console.log('error', error)
      throw new Error('Could not add item to cart')
    } finally {
      set({ loading: false })
    }
  },
  clearCart: async () => {
    try {
      set({ loading: true, error: false })
      await Api.cart.removeCartItems()
      set({
        totalAmount: 0,
        items: [],
      })
    } catch (error) {
      console.log('error', error)
      throw new Error('Could not clear cart')
    } finally {
      set({ loading: false })
    }
  },
}))
