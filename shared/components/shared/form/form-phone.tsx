'use client'

import React, { LegacyRef } from 'react'
import { useIMask } from 'react-imask'
import { useFormContext } from 'react-hook-form'

import { Input } from '../../ui'
import { InputProps } from '../../ui/input'
import { ClearButton } from '../clear-button'
import { ErrorText } from '../error-text'
import { RequiredSymbol } from '../required-symbol'

interface Props extends Omit<InputProps, 'placeholder'> {
  className?: string
  name: string
  label?: string
  required?: boolean
  allowClear?: boolean
  mask: string
}

export const FormPhone: React.FC<Props> = ({ className, name, label, required, allowClear, mask, ...props }) => {
  const {
    formState: { errors, defaultValues },
    watch,
    setValue: setFormValue,
    trigger,
  } = useFormContext()

  const errorText = errors?.[name]?.message as string

  const defaultValue = defaultValues?.[name] as string

  const text = watch(name)

  const { ref, value, setValue } = useIMask({ mask })

  const onClickClear = () => {
    setFormValue(name, '')
    setValue('')
  }

  React.useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  React.useEffect(() => {
    setFormValue(name, value)
    if (errorText) {
      trigger(name)
    }
  }, [value, name, setFormValue, trigger, errorText])

  return (
    <div className={className}>
      {label && (
        <p className="mb-2 font-medium">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input
          placeholder={mask}
          className="h-12 bg-white"
          {...props}
          ref={ref as LegacyRef<HTMLInputElement>}
          name={name}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        {allowClear && text && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  )
}
