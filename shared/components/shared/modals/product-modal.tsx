'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Root } from '@radix-ui/react-visually-hidden'

import { ProductWithRelations } from '@/@types/prisma'
import { Dialog } from '@/shared/components/ui'

import { ProductForm } from '../product'

interface Props {
  product: ProductWithRelations
}

export const ProductModal: React.FC<Props> = ({ product }) => {
  const router = useRouter()

  const onCloseModal = () => {
    router.back()
  }

  return (
    <Dialog.Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
      <Root>
        <Dialog.DialogTitle>Title</Dialog.DialogTitle>
      </Root>
      <Dialog.DialogContent className="min-h-[510px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0">
        <ProductForm product={product} onSubmit={onCloseModal} />
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
