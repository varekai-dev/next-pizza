'use client'

import React from 'react'
import { Root } from '@radix-ui/react-visually-hidden'

import { Dialog } from '@/shared/components/ui'
import { useUpdateCategory } from '@/shared/hooks'

import { CategoryForm } from '../setting-categories/category-form'
import { CategoryFormValues } from '../setting-categories/categoryFormSchema'

interface Props {
  categoryName: string
  categoryId: string
}

export const CategoryModal: React.FC<React.PropsWithChildren<Props>> = ({ categoryName, categoryId, children }) => {
  const [open, setOpen] = React.useState(false)

  const onSuccess = () => {
    setOpen(false)
  }
  const { updateCategory, isPending } = useUpdateCategory(onSuccess)

  const handleSubmit = (values: CategoryFormValues) => {
    updateCategory({
      id: categoryId,
      data: {
        name: values.name,
      },
    })
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
