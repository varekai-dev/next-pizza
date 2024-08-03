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

export default function CheckoutPage() {
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

    return (
        <Container className="mt-5 ">
            <Title text="Order" size="lg" className="font-extrabold mb-8" />
            <FormProvider {...form}>
                <div className="flex gap-10 flex-col lg:flex-row lg:gap-10 pb-5">
                    {/* Left side */}
                    <div className="flex flex-col gap-10 flex-1 lg:mb-20">
                        <CheckoutCart />
                        <form className="flex flex-col gap-10">
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
                        </form>
                    </div>
                    {/* Right side */}
                    <div className="w-full lg:w-[450px]">
                        <CheckoutSidebar />
                    </div>
                </div>
            </FormProvider>
        </Container>
    )
}
