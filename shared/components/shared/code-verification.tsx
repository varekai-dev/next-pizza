import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/shared/components/ui/input-otp'
import { cn } from '@/shared/lib'

interface Props {
    className?: string
    onChange?: (value: string) => void
    length: number
    onComplete?: (value: string) => void
    value?: string
}

export const CodeVerification: React.FC<Props> = ({
    className,
    onChange,
    length,
    onComplete,
    value,
}) => {
    return (
        <InputOTP
            onComplete={onComplete}
            onChange={onChange}
            className={cn('w-full', className)}
            maxLength={length}
            value={value}
        >
            <InputOTPGroup className="w-full gap-4">
                {Array.from({ length }).map((_, index) => (
                    <InputOTPSlot
                        className="text-lg font-bold"
                        key={index}
                        index={index}
                    />
                ))}
            </InputOTPGroup>
        </InputOTP>
    )
}
