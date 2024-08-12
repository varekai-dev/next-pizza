import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../ui'
import { FormInput } from '../form'
import { categoryFormSchema, CategoryFormValues } from './categoryFormSchema'

interface Props {
  className?: string
  categoryName: string
  onSubmit: (values: CategoryFormValues) => void
  isPending?: boolean
}

export const CategoryForm: React.FC<Props> = ({ className, onSubmit, categoryName, isPending }) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: categoryName,
    },
  })
  return (
    <div className={className}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormInput name="name" label="Category Name" required placeholder="Category name" />
            <Button loading={isPending} className="h-[48px]" type="submit">
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
