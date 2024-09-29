'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { X } from 'lucide-react'

import { Textarea } from '@/shared/components/ui/textarea'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  name: string
  label?: string
  required?: boolean
  allowClear?: boolean
}

export const FormTextarea: React.FC<Props> = ({ className, name, label, required, allowClear, ...props }) => {
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
      <p className="mb-2 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="relative">
        <Textarea className="h-12" {...register(name)} {...props} />
        {text && allowClear && (
          <button
            onClick={onClickClear}
            className="absolute right-4 top-7 -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-100"
          >
            <X className="size-5" />
          </button>
        )}
      </div>
      {errorText && <p className="mt-2 text-sm text-red-500">{errorText}</p>}
    </div>
  )
}
