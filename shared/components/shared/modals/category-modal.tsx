'use client'

import React from 'react'
import { Root } from '@radix-ui/react-visually-hidden'

import { Dialog } from '@/shared/components/ui'

import { CategoryForm } from '../setting-categories/category-form'
import { CategoryFormValues } from '../setting-categories/categoryFormSchema'

interface Props {
  categoryName?: string
  onSubmit: (values: CategoryFormValues) => void
  isPending?: boolean
}

export const CategoryModal: React.FC<React.PropsWithChildren<Props>> = ({
  categoryName,
  children,
  isPending,
  onSubmit,
}) => {
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (values: CategoryFormValues) => {
    onSubmit(values)
    setOpen(false)
  }
  return (
    <Dialog.Dialog open={open} onOpenChange={(isOpen: boolean) => setOpen(isOpen)}>
      <Root>
        <Dialog.DialogTitle>Title</Dialog.DialogTitle>
      </Root>
      <Dialog.DialogTrigger asChild>{children}</Dialog.DialogTrigger>
      <Dialog.DialogContent className="w-[300px] max-w-[300px] bg-white overflow-hidden flex flex-col justify-start  items-center">
        <CategoryForm categoryName={categoryName} onSubmit={handleSubmit} className="w-[250px]" isPending={isPending} />
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
