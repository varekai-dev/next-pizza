'use client'

import { CartItem } from '@/shared/components/shared/cart-item'
import {
    Container,
    Title,
    WhiteBlock,
    CheckoutItemDetails,
} from '@/shared/components/shared'
import { CartItemSkeleton } from '@/shared/components/shared/skeletons/cart-item-skeleton'
import { useCart } from '@/shared/hooks'
import { Trash2 } from 'lucide-react'
import { Input, Textarea } from '@/shared/components/ui'
import { getCartItemDetails } from '@/shared/lib'
import { PizzaSize, PizzaType } from '@/shared/constants'

const VAT = 15
const DELIVERY_PRICE = 100

export default function CheckoutPage() {
    const {
        items,
        loading,
        totalAmount,
        removeCartItem,
        updateItemQuantity,
        clearCart,
    } = useCart(true)

    const vatPrice = (totalAmount * VAT) / 100
    const deliveryPrice = totalAmount ? DELIVERY_PRICE : 0
    const totalPrice = totalAmount + deliveryPrice + vatPrice

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => {
        const value = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, value)
    }

    return (
        <Container className="mt-5">
            <Title text="Order" size="lg" className="font-extrabold mb-8" />
            <div className="flex gap-10">
                {/* Left side */}
                <div className="flex flex-col gap-10 flex-1 mb-20">
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
                    >
                        <div className="flex flex-col gap-5">
                            {loading
                                ? [...Array(items?.length || 3)].map(
                                      (_, index) => (
                                          <CartItemSkeleton key={index} />
                                      )
                                  )
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
                            <p className="text-center text-gray-400 p-10">
                                Cart is empty
                            </p>
                        )}
                    </WhiteBlock>
                    <WhiteBlock title="2. Personal info">
                        <div className="grid grid-cols-2 gap-5">
                            <Input
                                name="firstName"
                                className="text-base"
                                placeholder="First Name"
                            />
                            <Input
                                name="secondName"
                                className="text-base"
                                placeholder="Second Name"
                            />
                            <Input
                                name="email"
                                className="text-base"
                                placeholder="Email"
                            />
                            <Input
                                name="phone"
                                className="text-base"
                                placeholder="Phone"
                            />
                        </div>
                    </WhiteBlock>
                    <WhiteBlock title="3. Delivery address">
                        <div className="flex flex-col gap-5">
                            <Input
                                placeholder="Address"
                                className="text-base"
                            />
                            <Textarea
                                rows={5}
                                className="text-base"
                                placeholder="Commentary"
                            />
                        </div>
                    </WhiteBlock>
                </div>
                {/* Right side */}
                <div className="w-[450px]">
                    <CheckoutItemDetails
                        totalPrice={totalPrice}
                        totalAmount={totalAmount}
                        vatPrice={vatPrice}
                        deliveryPrice={deliveryPrice}
                    />
                </div>
            </div>
        </Container>
    )
}
