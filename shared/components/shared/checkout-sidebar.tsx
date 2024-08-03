'use client'

import React from 'react'
import { WhiteBlock } from './white-block'
import { Button, Skeleton } from '../ui'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { CheckoutFormValues } from './checkout/checkout-form-schema'
import { useCart } from '@/shared/hooks'
import { CheckoutSidebarItem } from './checkout-sidebar-item'

interface Props {
    className?: string
}

const VAT = 15
const DELIVERY_PRICE = 100

export const CheckoutSidebar: React.FC<Props> = ({ className }) => {
    const { totalAmount, loading } = useCart()
    const vatPrice = (totalAmount * VAT) / 100
    const deliveryPrice = totalAmount ? DELIVERY_PRICE : 0
    const totalPrice = totalAmount + deliveryPrice + vatPrice

    const { handleSubmit } = useFormContext<CheckoutFormValues>()

    const onSubmit = (data: CheckoutFormValues) => {
        console.log('data', data)
    }

    return (
        <div className={className}>
            <WhiteBlock className="p-6 sticky top-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xl">Total:</span>

                    {loading || totalPrice === 0 ? (
                        <Skeleton className="w-48 h-11" />
                    ) : (
                        <span className="h-11 text-4xl font-extrabold">
                            {totalPrice} ₴
                        </span>
                    )}
                </div>
                <CheckoutSidebarItem
                    loading={loading}
                    title="Items price:"
                    value={totalAmount}
                    icon={<Package size={18} className="mr-2 text-gray-400" />}
                />
                <CheckoutSidebarItem
                    loading={loading}
                    title="Tax:"
                    value={vatPrice}
                    icon={<Percent size={18} className="mr-2 text-gray-400" />}
                />

                <CheckoutSidebarItem
                    loading={loading}
                    title="Delivery:"
                    value={deliveryPrice}
                    icon={<Truck size={18} className="mr-2 text-gray-400" />}
                />
                <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={!totalAmount}
                    className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
                >
                    Checkout
                    <ArrowRight className="w-5 ml-2" />
                </Button>
            </WhiteBlock>
        </div>
    )
}
