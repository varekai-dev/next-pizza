'use client'

import {
    Container,
    Title,
    CheckoutItemDetails,
    CheckoutCart,
    CheckoutPersonalInfo,
    CheckoutAddressForm,
    checkoutFormSchema,
    CheckoutFormValues,
} from '@/shared/components/shared'
import { FormProvider, useForm } from 'react-hook-form'
import { useCart } from '@/shared/hooks'
import { zodResolver } from '@hookform/resolvers/zod'

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

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    })

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

    const onSubmit = (data: CheckoutFormValues) => {
        console.log('data', data)
    }

    return (
        <Container className="mt-5 ">
            <Title text="Order" size="lg" className="font-extrabold mb-8" />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10 flex-col lg:flex-row lg:gap-10 pb-5">
                        {/* Left side */}
                        <div className="flex flex-col gap-10 flex-1 lg:mb-20">
                            <CheckoutCart
                                items={items}
                                totalAmount={totalAmount}
                                loading={loading}
                                clearCart={clearCart}
                                removeCartItem={removeCartItem}
                                onClickCountButton={onClickCountButton}
                            />
                            <CheckoutPersonalInfo />
                            <CheckoutAddressForm />
                        </div>
                        {/* Right side */}
                        <div className="w-full lg:w-[450px]">
                            <CheckoutItemDetails
                                totalPrice={totalPrice}
                                totalAmount={totalAmount}
                                vatPrice={vatPrice}
                                deliveryPrice={deliveryPrice}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}
