import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'

import { Button } from '../../ui'
import { FormInput, FormPhone } from '../form'
import { FormRegisterValues } from '../modals/auth-modal/forms/schemas'
import { formUpdateProfileSchema, FormUpdateProfileValues } from './updateSchema'

interface Props {
  className?: string
  data: User
  onSubmit: (data: Partial<FormRegisterValues>) => void
}

export const ProfileForm: React.FC<Props> = ({ className, data, onSubmit }) => {
  const form = useForm<FormUpdateProfileValues>({
    resolver: zodResolver(formUpdateProfileSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    },
  })

  return (
    <div className={className}>
      <FormProvider {...form}>
        <form className="mt-10 flex w-96 flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="Email" required allowClear />
          <FormInput name="fullName" label="Full Name" required allowClear />
          <FormPhone
            name="phone"
            className="text-base"
            mask="+38(000)000-00-00"
            allowClear
            required
            label="Phone Number"
          />
          <Button disabled={form.formState.isSubmitting} className="mt-5 text-base" type="submit">
            Update info
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
