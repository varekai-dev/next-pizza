import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { formLoginSchema, formLoginValues } from './schemas'
import { FormInput } from '../../../form'
import { Button } from '@/shared/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Title } from '../../../title'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Props {
    className?: string
    onClose: () => void
}

export const LoginForm: React.FC<Props> = ({ className, onClose }) => {
    const router = useRouter()
    const form = useForm<formLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: formLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            })

            if (!resp?.ok) {
                console.log('resp', resp?.error)
                if (resp?.error === 'Verify your email') {
                    router.push('?verify&email=' + data.email)
                } else {
                    throw Error(resp?.error || 'Could not login')
                }
            }
            onClose()
        } catch (error: any) {
            console.log('Error [Login]', error)
            toast.error(error.message || 'Could not login', {
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
                                text="Login"
                                size="md"
                                className="font-bold"
                            />
                            <p className="text-gray-400">
                                Enter your email to login
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
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <Button
                        type="submit"
                        className="h-12 text-base"
                        loading={form.formState.isSubmitting}
                    >
                        Login
                    </Button>
                </form>
            </FormProvider>
        </div>
    )
}
