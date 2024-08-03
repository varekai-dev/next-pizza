'use client'

import React from 'react'
import { RequiredSymbol } from '../required-symbol'
import { Input } from '../../ui'
import { InputProps } from '../../ui/input'
import { ErrorText } from '../error-text'
import { ClearButton } from '../clear-button'
import { useFormContext } from 'react-hook-form'

interface Props extends InputProps {
    className?: string
    name: string
    label?: string
    required?: boolean
    allowClear?: boolean
}

export const FormInput: React.FC<Props> = ({
    className,
    name,
    label,
    required,
    allowClear,
    ...props
}) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext()

    const errorText = errors?.[name]?.message as string

    const text = watch(name)

    const onClickClear = () => {
        setValue(name, '')
    }

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}
            <div className="relative">
                <Input
                    className="h-12 text-md"
                    {...register(name)}
                    {...props}
                    name={name}
                />
                {allowClear && text && <ClearButton onClick={onClickClear} />}
            </div>
            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    )
}
