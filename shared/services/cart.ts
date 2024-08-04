import { axiosInstance } from './instance'
import { ApiRoutes } from './constants'
import { CartDTO, CartResponse, CreateCartItemValues } from './dto/cart.dto'

export const getCart = async (): Promise<CartResponse> => {
    return (await axiosInstance.get<CartResponse>(ApiRoutes.CART)).data
}

export const updateItemQuantity = async (
    itemId: string,
    quantity: number
): Promise<CartDTO> => {
    return (
        await axiosInstance.patch<CartDTO>(`${ApiRoutes.CART}/${itemId}`, {
            quantity,
        })
    ).data
}

export const deleteItem = async (itemId: string): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>(`${ApiRoutes.CART}/${itemId}`))
        .data
}

export const createCartItem = async (
    data: CreateCartItemValues
): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>(ApiRoutes.CART, data)).data
}

export const removeCartItems = async (): Promise<CartDTO> => {
    return (await axiosInstance.delete(ApiRoutes.CART)).data
}
