import React from 'react'
import { WhiteBlock } from './white-block'
import { Button } from '../ui'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'

interface Props {
    className?: string
    totalPrice: number
    totalAmount: number
    vatPrice: number
    deliveryPrice: number
}

export const CheckoutItemDetails: React.FC<Props> = ({
    className,
    totalPrice,
    totalAmount,
    vatPrice,
    deliveryPrice,
}) => {
    return (
        <div className={className}>
            <WhiteBlock className="p-6 sticky top-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xl">Total:</span>
                    <span className="text-4xl font-extrabold">
                        {totalPrice} ₴
                    </span>
                </div>

                <div className="flex my-4">
                    <span className="flex flex-1 text-lg text-neutral-400">
                        <div className="flex items-center">
                            <Package size={18} className="mr-2 text-gray-400" />
                            Items price:
                        </div>

                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₴</span>
                </div>

                <div className="flex my-4">
                    <span className="flex flex-1 text-lg text-neutral-400">
                        <div className="flex items-center">
                            <Percent size={18} className="mr-2 text-gray-400" />
                            Tax:
                        </div>
                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{vatPrice} ₴</span>
                </div>

                <div className="flex my-4">
                    <span className="flex flex-1 text-lg text-neutral-400">
                        <div className="flex items-center">
                            <Truck size={18} className="mr-2 text-gray-400" />
                            Delivery:
                        </div>
                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{deliveryPrice} ₴</span>
                </div>

                <Button
                    type="submit"
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
