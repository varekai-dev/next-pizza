'use client'

import React from 'react'
import toast from 'react-hot-toast'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'

import { updateUserInfo } from '@/app/action'

import { Button } from '../ui'
import { Container } from './container'
import { FormInput, FormPhone } from './form'
import { formRegisterSchema, formRegisterValues } from './modals/auth-modal/forms/schemas'
import { Title } from './title'

interface Props {
  className?: string
  data: User
}

export const ProfileForm: React.FC<Props> = ({ className, data }) => {
  const form = useForm<formRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
      phone: data.phone,
    },
  })

  const onSubmit = async (data: formRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        phone: data.phone,
      })

      toast.error('Data updated 📝', {
        icon: '✅',
      })
    } catch (error) {
      return toast.error('Error during update', {
        icon: '❌',
      })
    }
  }

  return (
    <div className={className}>
      <Container className="md:px-5 px-0 md:block flex flex-col items-center">
        <Title text="Profile" size="md" className="font-bold" />

        <FormProvider {...form}>
          <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
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
            <FormInput type="password" name="password" label="New Password" required allowClear />
            <FormInput type="password" name="confirmPassword" label="Confirm Password" required allowClear />

            <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
              Save
            </Button>
          </form>
        </FormProvider>
      </Container>
    </div>
  )
}
