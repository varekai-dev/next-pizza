'use client'

import { Dialog } from '@/shared/components/ui'
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { useCartStore } from '@/shared/store'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'
import toast from 'react-hot-toast'

interface Props {
    product: ProductWithRelations
}

export const ChooseProductModal: React.FC<Props> = ({ product }) => {
    const [addCartItem, loading] = useCartStore(state => [
        state.addCartItem,
        state.loading,
    ])
    const router = useRouter()
    const isPizza = Boolean(product.items[0].pizzaType)

    const onCloseModal = () => {
        router.back()
    }

    const onSubmit = async (values: CreateCartItemValues) => {
        try {
            await addCartItem(values)
            toast.success(`${product.name} added to cart`)
            onCloseModal()
        } catch (error) {
            toast.error('Could not add item to cart')
            console.log(error)
        }
    }
    return (
        <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
            <VisuallyHidden.Root>
                <DialogTitle>Title</DialogTitle>
            </VisuallyHidden.Root>
            <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[510px] bg-white overflow-hidden">
                {isPizza ? (
                    <ChoosePizzaForm
                        onClickAdd={onSubmit}
                        name={product.name}
                        items={product.items}
                        imageUrl={product.imageUrl}
                        ingredients={product.ingredients}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm
                        price={product.items[0].price}
                        productItemId={product.items[0].id}
                        onClickAdd={onSubmit}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        loading={loading}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}
