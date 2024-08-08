'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Root } from '@radix-ui/react-visually-hidden'

import { ProductWithRelations } from '@/@types/prisma'
import { useBreakpoint } from '@/shared/hooks'

import { Drawer } from '../../ui'
import { DrawerContent, DrawerTitle } from '../../ui/drawer'
import { ProductForm } from './product-form'

interface Props {
  product: ProductWithRelations
}

export const ProductDrawer: React.FC<Props> = ({ product }) => {
  const router = useRouter()

  const onCloseModal = () => {
    router.back()
  }

  const isLg = useBreakpoint('lg')

  return (
    <Drawer open={Boolean(product)} onOpenChange={(open) => !open && router.back()}>
      <Root>
        <DrawerTitle>Title</DrawerTitle>
      </Root>
      <DrawerContent className={'bg-[#f4f1ee]'}>
        <ProductForm product={product} onSubmit={onCloseModal} isDrawer={!isLg} />
      </DrawerContent>
    </Drawer>
  )
}
