import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { formRegisterSchema, formRegisterValues } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Title } from '../../../title'
import Image from 'next/image'
import { FormInput } from '../../../form'
import { Button } from '@/shared/components/ui'

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
        },
    })
    const onSubmit = async (data: formRegisterValues) => {
        try {
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
                <form
                    className="flex flex-col gap-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex justify-between items-center">
                        <div className="mr-2">
                            <Title
                                text="Register"
                                size="md"
                                className="font-bold"
                            />
                            <p className="text-gray-400">
                                Enter your email to register
                            </p>
                        </div>
                        <Image
                            src="/assets/images/phone-icon.png"
                            alt="phone-icon"
                            width={60}
                            height={60}
                        />
                    </div>
                    <FormInput
                        label="Email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <FormInput
                        label="Full name"
                        name="fullName"
                        placeholder="Full name"
                        required
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        required
                    />
                    <Button
                        type="submit"
                        className="h-12 text-base"
                        loading={form.formState.isSubmitting}
                    >
                        Register
                    </Button>
                </form>
            </FormProvider>
        </div>
    )
}
