import { ApiRoute } from '@/@types'

import { CartDTO, CartResponse, CreateCartItemValues } from './dto/cart.dto'
import { axiosInstance } from './instance'

export const getCart = async (): Promise<CartResponse> => {
  return (await axiosInstance.get<CartResponse>(ApiRoute.CART)).data
}

export const updateItemQuantity = async (itemId: string, quantity: number): Promise<CartDTO> => {
  return (
    await axiosInstance.patch<CartDTO>(`${ApiRoute.CART}/${itemId}`, {
      quantity,
    })
  ).data
}

export const deleteItem = async (itemId: string): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>(`${ApiRoute.CART}/${itemId}`)).data
}

export const createCartItem = async (data: CreateCartItemValues): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>(ApiRoute.CART, data)).data
}

export const removeCartItems = async (): Promise<void> => {
  return (await axiosInstance.delete<void>(ApiRoute.CART)).data
}
