'use client'

import {
    Container,
    Title,
    CheckoutSidebar,
    CheckoutCart,
    CheckoutPersonalInfo,
    CheckoutAddressForm,
    checkoutFormSchema,
    CheckoutFormValues,
} from '@/shared/components/shared'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/shared/lib'
import { useCart } from '@/shared/hooks'
import { createOrder } from '@/app/action'
import toast from 'react-hot-toast'
import React from 'react'

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false)
    const { loading } = useCart()
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

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true)
            const url = await createOrder(data)

            toast.success('Order created. Redirecting to payment page...')

            if (url) {
                location.href = url
            }
        } catch (error) {
            console.log(error)
            toast.error('Error creating order')
            setSubmitting(false)
        }
    }

    return (
        <Container className="mt-5 ">
            <Title text="Order" size="lg" className="font-extrabold mb-8" />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10 flex-col lg:flex-row lg:gap-10 pb-5">
                        {/* Left side */}
                        <div className="flex flex-col gap-10 flex-1 lg:mb-20">
                            <CheckoutCart />
                            <CheckoutPersonalInfo
                                className={cn({
                                    'opacity-40  pointer-events-none': loading,
                                })}
                            />
                            <CheckoutAddressForm
                                className={cn({
                                    'opacity-40 pointer-events-none': loading,
                                })}
                            />
                        </div>
                        {/* Right side */}
                        <div className="w-full lg:w-[450px]">
                            <CheckoutSidebar
                                submitting={loading || submitting}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}
