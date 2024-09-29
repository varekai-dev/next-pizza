'use client'

import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Root } from '@radix-ui/react-visually-hidden'

import { Switch } from '@/shared/components/ui/switch'
import { cn } from '@/shared/lib'

import { Button, Dialog } from '../../../ui'
import { LoginForm } from './forms/login-form'
import { RegisterForm } from './forms/register-form'

interface Props {
  className?: string
  open: boolean
  onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ className, open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login')

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login')
  }

  const handleClose = () => {
    onClose()
    setType('login')
  }
  return (
    <Dialog.Dialog open={open} onOpenChange={onClose}>
      <Dialog.DialogContent className={cn('max-w-[90vw] bg-white p-10 sm:max-w-[450px]', className)}>
        <Root>
          <Dialog.DialogTitle>Title</Dialog.DialogTitle>
        </Root>
        <div className="scrollbar max-h-[80vh] overflow-x-auto p-2">
          <div className="mb-2 flex items-center justify-center gap-5">
            <label
              htmlFor="auth-switch"
              className={cn('cursor-pointer text-base font-bold', {
                'pointer-events-none text-red-400': type === 'login',
              })}
            >
              Login
            </label>
            <Switch id="auth-switch" checked={type === 'register'} onCheckedChange={() => onSwitchType()} />
            <label
              htmlFor="auth-switch"
              className={cn('cursor-pointer text-base font-bold', {
                'pointer-events-none text-red-400': type === 'register',
              })}
            >
              Register
            </label>
          </div>
          {type === 'register' ? <RegisterForm onClose={handleClose} /> : <LoginForm onClose={handleClose} />}
          <div className="py-3">
            <hr />
          </div>

          <div className="flex w-full items-center justify-center">
            <Button
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/',
                  redirect: true,
                })
              }
              variant="secondary"
              className="flex h-12 w-full items-center gap-3 text-base"
            >
              <Image width={24} height={24} alt="google-logo" src="/assets/logo/google-logo.svg" />
              Google
            </Button>
          </div>
        </div>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
