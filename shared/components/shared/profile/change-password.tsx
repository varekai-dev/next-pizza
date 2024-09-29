import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../ui'
import { FormInput } from '../form'
import { FormRegisterValues } from '../modals/auth-modal/forms/schemas'
import { formUpdatePasswordSchema, formUpdatePasswordValues } from './updateSchema'

interface Props {
  className?: string
  onSubmit: (data: Partial<FormRegisterValues>) => void
}

export const ChangePassword: React.FC<Props> = ({ className, onSubmit }) => {
  const form = useForm<formUpdatePasswordValues>({
    resolver: zodResolver(formUpdatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = async (data: Partial<FormRegisterValues>) => {
    try {
      onSubmit(data)
      form.reset()
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className={className}>
      <FormProvider {...form}>
        <form className="mt-10 flex w-96 flex-col gap-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormInput type="password" name="password" label="New Password" required allowClear />
          <FormInput type="password" name="confirmPassword" label="Confirm Password" required allowClear />
          <Button disabled={form.formState.isSubmitting} className="mt-5 text-base" type="submit">
            Update password
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
