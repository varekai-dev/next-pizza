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
import { useSession } from 'next-auth/react'
import { Api } from '@/shared/services/api-client'

export default function CheckoutPage() {
    const { data: session } = useSession()
    const [submitting, setSubmitting] = React.useState(false)
    const { loading, totalAmount } = useCart()
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            fullName: '',
            phone: '',
            address: '',
            comment: '',
        },
    })

    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe()
            form.setValue('fullName', data.fullName)
            form.setValue('email', data.email)
            form.setValue('phone', data.phone)
        }

        if (session) {
            fetchUserInfo()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

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
                            <CheckoutCart
                                className={cn({
                                    'opacity-40  pointer-events-none':
                                        loading || totalAmount === 0,
                                })}
                            />
                            <CheckoutPersonalInfo
                                className={cn({
                                    'opacity-40  pointer-events-none':
                                        loading || totalAmount === 0,
                                })}
                            />
                            <CheckoutAddressForm
                                className={cn({
                                    'opacity-40 pointer-events-none':
                                        loading || totalAmount === 0,
                                })}
                            />
                        </div>

                        {/* Right side */}
                        <div
                            className={cn('w-full lg:w-[450px]', {
                                'opacity-40 pointer-events-none':
                                    loading || totalAmount === 0,
                            })}
                        >
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
