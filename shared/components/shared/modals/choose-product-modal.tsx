'use client'

import { Dialog } from '@/shared/components/ui'
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm } from '../choose-pizza-form'

interface Props {
    product: ProductWithRelations
}

export const ChooseProductModal: React.FC<Props> = ({ product }) => {
    const router = useRouter()
    const isPizza = Boolean(product.items[0].pizzaType)

    const onCloseModal = () => {
        router.back()
    }
    return (
        <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
            <VisuallyHidden.Root>
                <DialogTitle>Title</DialogTitle>
            </VisuallyHidden.Root>
            <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[510px] bg-white overflow-hidden">
                {isPizza ? (
                    <ChoosePizzaForm
                        name={product.name}
                        items={product.items}
                        imageUrl={product.imageUrl}
                        ingredients={product.ingredients}
                    />
                ) : (
                    <ChooseProductForm
                        name={product.name}
                        imageUrl={product.imageUrl}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}
