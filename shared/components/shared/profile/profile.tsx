'use client'

import React from 'react'
import toast from 'react-hot-toast'
import { User } from '@prisma/client'

import { updateUserInfo } from '@/app/action'

import { Container } from '../container'
import { FormRegisterValues } from '../modals/auth-modal/forms/schemas'
import { Title } from '../title'
import { ChangePassword } from './change-password'
import { ProfileForm } from './profile-form'

interface Props {
  className?: string
  data: User
}

export const Profile: React.FC<Props> = ({ className, data }) => {
  const onSubmit = async (data: Partial<FormRegisterValues>) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = data
      await updateUserInfo(rest)

      toast.error('Data updated 📝', {
        icon: '✅',
      })
    } catch (error) {
      console.log('error', error)
      return toast.error('Error during update', {
        icon: '❌',
      })
    }
  }
  return (
    <div className={className}>
      <Container className="md:px-5 px-0 md:block flex flex-col items-center">
        <Title text="Profile" size="md" className="font-bold" />
        <ProfileForm onSubmit={onSubmit} data={data} className="mb-12" />
        <ChangePassword onSubmit={onSubmit} />
      </Container>
    </div>
  )
}
