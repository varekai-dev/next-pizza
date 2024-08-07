import { CartResponse } from '../services/dto/cart.dto'
import { calcCartItemTotalPrice } from './calc-cart-item-total-price'

export type CartStateItem = {
  id: string
  quantity: number
  name: string
  disabled?: boolean
  imageUrl: string
  price: number
  pizzaSize?: number | null
  pizzaType?: number | null
  ingredients: Array<{ name: string; price: number }>
}

interface ReturnProps {
  items: CartStateItem[]
  totalAmount: number
}

export const getCartDetails = (data: CartResponse): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    disabled: false,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[]
  return {
    totalAmount: data.totalAmount,
    items,
  }
}
