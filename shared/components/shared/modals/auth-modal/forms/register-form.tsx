import React from 'react'
import toast from 'react-hot-toast'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

import { registerUser } from '@/app/action'
import { Button } from '@/shared/components/ui'

import { FormInput, FormPhone } from '../../../form'
import { Title } from '../../../title'
import { formRegisterSchema, formRegisterValues } from './schemas'

interface Props {
  className?: string
  onClose: () => void
}

export const RegisterForm: React.FC<Props> = ({ className, onClose }) => {
  const form = useForm<formRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      confirmPassword: '',
      phone: '',
    },
  })
  const onSubmit = async (data: formRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        phone: data.phone,
      })

      toast.error('Registration successful 📝. Confirm your email', {
        icon: '✅',
      })
      onClose()
    } catch (error) {
      console.log('Error [Register]', error)
      toast.error('Could not register', {
        icon: '❌',
      })
    }
  }

  return (
    <div className={className}>
      <FormProvider {...form}>
        <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <div className="mr-2">
              <Title text="Register" size="md" className="font-bold" />
              <p className="text-gray-400">Enter your email to register</p>
            </div>
            <Image src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
          </div>
          <FormInput label="Email" name="email" placeholder="Email" required />
          <FormInput label="Full Name" name="fullName" placeholder="Full Name" required />
          <FormInput label="Password" name="password" type="password" placeholder="Password" required />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <FormPhone
            name="phone"
            className="text-base"
            mask="+38(000)000-00-00"
            allowClear
            required
            label="Phone Number"
          />
          <Button type="submit" className="h-12 text-base" loading={form.formState.isSubmitting}>
            Register
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
