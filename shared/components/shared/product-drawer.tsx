'use client'

import { ProductWithRelations } from '@/@types/prisma'
import React from 'react'
import { Drawer } from '../ui'
import { DrawerContent, DrawerTitle } from '../ui/drawer'
import { useRouter } from 'next/navigation'
import { ProductForm } from './product-form'
import { Root } from '@radix-ui/react-visually-hidden'
import { useBreakpoint } from '@/shared/hooks'
interface Props {
    className?: string
    product: ProductWithRelations
}

export const ProductDrawer: React.FC<Props> = ({ className, product }) => {
    const router = useRouter()

    const onCloseModal = (open?: boolean) => {
        if (open === false) {
            router.back()
        }
    }

    const isLg = useBreakpoint('lg')

    return (
        <Drawer open={Boolean(product)} onOpenChange={onCloseModal}>
            <Root>
                <DrawerTitle>Title</DrawerTitle>
            </Root>
            <DrawerContent className="bg-[#f4f1ee]">
                <ProductForm
                    product={product}
                    onSubmit={onCloseModal}
                    isDrawer={!isLg}
                />
            </DrawerContent>
        </Drawer>
    )
}
