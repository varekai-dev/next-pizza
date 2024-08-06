'use client'

import React from 'react'
import { Button, Dialog } from '../../../ui'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { LoginForm } from './forms/login-form'
import { Switch } from '@/shared/components/ui/switch'
import { cn } from '@/shared/lib'
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
    }
    return (
        <Dialog.Dialog open={open} onOpenChange={onClose}>
            <Dialog.DialogContent className="max-w-[450px] bg-white p-10">
                <div className="flex justify-center items-center gap-5 mb-2">
                    <label
                        htmlFor="auth-switch"
                        className={cn('text-base font-bold cursor-pointer', {
                            'text-red-400 pointer-events-none':
                                type === 'login',
                        })}
                    >
                        Login
                    </label>
                    <Switch
                        id="auth-switch"
                        checked={type === 'register'}
                        onCheckedChange={() => onSwitchType()}
                    />
                    <label
                        htmlFor="auth-switch"
                        className={cn('text-base font-bold cursor-pointer', {
                            'text-red-400 pointer-events-none':
                                type === 'register',
                        })}
                    >
                        Register
                    </label>
                </div>
                {type === 'register' ? (
                    <RegisterForm onClose={handleClose} />
                ) : (
                    <LoginForm onClose={handleClose} />
                )}

                <hr />
                <div className="flex items-center w-full justify-center">
                    <Button
                        onClick={() =>
                            signIn('google', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        variant="secondary"
                        className="flex items-center gap-3 w-full h-12 text-base"
                    >
                        <Image
                            width={24}
                            height={24}
                            alt="google-logo"
                            src="/assets/logo/google-logo.svg"
                        />
                        Google
                    </Button>
                </div>
            </Dialog.DialogContent>
        </Dialog.Dialog>
    )
}
