'use client'

import { Dialog } from '@/shared/components/ui'
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import React from 'react'
import { useRouter } from 'next/navigation'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ProductWithRelations } from '@/@types/prisma'

import { ProductForm } from '../product-form'

interface Props {
    product: ProductWithRelations
    id?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, id }) => {
    const router = useRouter()

    const onCloseModal = () => {
        router.back()
    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
            <VisuallyHidden.Root>
                <DialogTitle>Title</DialogTitle>
            </VisuallyHidden.Root>
            <DialogContent
                className="p-0 min-h-[510px] bg-white overflow-hidden xl:w-[1060px] xl:max-w-[1060px]
            md:w-[600px] md:max-w-[600px]"
            >
                <ProductForm product={product} onSubmit={onCloseModal} />
            </DialogContent>
        </Dialog>
    )
}
