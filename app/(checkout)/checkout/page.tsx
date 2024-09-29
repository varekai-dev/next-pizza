'use client'

import React from 'react'
import toast from 'react-hot-toast'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'

import { createOrder } from '@/app/action'
import {
  CheckoutAddressForm,
  CheckoutCart,
  checkoutFormSchema,
  CheckoutFormValues,
  CheckoutPersonalInfo,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components/shared'
import { useCart } from '@/shared/hooks'
import { cn } from '@/shared/lib'
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
      form.reset({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      })
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
    <Container className="mt-5">
      <Title text="Order" size="lg" className="mb-8 font-extrabold" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10 pb-5 lg:flex-row lg:gap-10">
            {/* Left side */}
            <div className="flex flex-1 flex-col gap-10 lg:mb-20">
              <CheckoutCart
                className={cn({
                  'pointer-events-none opacity-40': loading || totalAmount === 0,
                })}
              />
              <CheckoutPersonalInfo
                className={cn({
                  'pointer-events-none opacity-40': loading || totalAmount === 0,
                })}
              />
              <CheckoutAddressForm
                className={cn({
                  'pointer-events-none opacity-40': loading || totalAmount === 0,
                })}
              />
            </div>

            {/* Right side */}
            <div
              className={cn('w-full lg:w-[450px]', {
                'pointer-events-none opacity-40': loading || totalAmount === 0,
              })}
            >
              <CheckoutSidebar submitting={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
