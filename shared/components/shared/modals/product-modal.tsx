'use client'

import { Dialog } from '@/shared/components/ui'
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Root } from '@radix-ui/react-visually-hidden'
import { ProductWithRelations } from '@/@types/prisma'

import { ProductForm } from '../product-form'

interface Props {
    product: ProductWithRelations
}

export const ProductModal: React.FC<Props> = ({ product }) => {
    const router = useRouter()

    const onCloseModal = () => {
        router.back()
    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
            <Root>
                <DialogTitle>Title</DialogTitle>
            </Root>
            <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[510px] bg-white overflow-hidden">
                <ProductForm product={product} onSubmit={onCloseModal} />
            </DialogContent>
        </Dialog>
    )
}
