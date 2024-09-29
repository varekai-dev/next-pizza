'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Input } from '../../ui'
import { InputProps } from '../../ui/input'
import { ClearButton } from '../clear-button'
import { ErrorText } from '../error-text'
import { RequiredSymbol } from '../required-symbol'

export interface FormInputProps extends InputProps {
  className?: string
  name: string
  label?: string
  required?: boolean
  allowClear?: boolean
}

export const FormInput: React.FC<FormInputProps> = ({ className, name, label, required, allowClear, ...props }) => {
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
        <p className="mb-2 font-medium">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 bg-white" {...register(name)} {...props} name={name} />
        {allowClear && text && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  )
}
