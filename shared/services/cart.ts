import { axiosInstance } from './instance'
import { ApiRoutes } from './constants'
import { CartDTO, CartResponse } from './dto/cart.dto'

export const getCart = async (): Promise<CartResponse> => {
    return (await axiosInstance.get<CartResponse>(ApiRoutes.CART)).data
}

export const updateItemQuantity = async (
    itemId: number,
    quantity: number
): Promise<CartDTO> => {
    return (
        await axiosInstance.patch<CartDTO>(`${ApiRoutes.CART}/${itemId}`, {
            quantity,
        })
    ).data
}

export const deleteItem = async (itemId: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>(`${ApiRoutes.CART}/${itemId}`))
        .data
}
