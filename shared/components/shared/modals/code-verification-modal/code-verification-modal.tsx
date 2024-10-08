'use client'

import React from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Root } from '@radix-ui/react-visually-hidden'
import { AxiosError } from 'axios'

import { Route } from '@/@types'
import { requestVerificationCode } from '@/app/action'
import { useTimer } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { verifyEmail } from '@/shared/services/auth'

import { Button, Dialog } from '../../../ui'
import { CodeVerification } from '../../code-verification'
import { Title } from '../../title'

interface Props {
  className?: string
}

const TIME_TO_REQUEST = 30

export const CodeVerificationModal: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [requestNewCodeLoading, setRequestNewCodeLoading] = React.useState(false)
  const [isRequestActive, setIsRequestActive] = React.useState(false)

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen)
    router.push(Route.HOME)
  }

  React.useEffect(() => {
    if (searchParams.has('verify')) {
      setOpen(true)
    }
    const code = searchParams.get('code')
    if (typeof code === 'string') {
      setValue(code.slice(0, 6) as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const [isVerificationLoading, setIsVerificationLoading] = React.useState(false)

  const handleSubmit = async (code: string) => {
    try {
      setIsVerificationLoading(true)
      await verifyEmail(code)
      toast.success('Email verified')
      router.push(Route.HOME)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || 'Could not verify email')
      }
      console.log('error [VERIFY_EMAIL]', error)
    } finally {
      setIsVerificationLoading(false)
      const email = searchParams.get('email')
      const emailParam = email ? `&email=${email}` : ''
      router.push(`?verify${emailParam}&code=`)
    }
  }

  React.useEffect(() => {
    if (value.length === 6) {
      handleSubmit(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const { timeLeft, setTimeLeft } = useTimer(TIME_TO_REQUEST, () => setIsRequestActive(true))

  const handleRequestNewCode = async () => {
    try {
      if (email) {
        setRequestNewCodeLoading(true)
        await requestVerificationCode(email)
        setTimeLeft(TIME_TO_REQUEST)
        setIsRequestActive(false)
        toast.success('New code was sent')
      }
    } catch (error) {
      console.log('error [REQUEST_VERIFICATION_CODE]', error)
    } finally {
      setRequestNewCodeLoading(false)
    }
  }

  return (
    <Dialog.Dialog open={open} onOpenChange={handleClose}>
      <Dialog.DialogContent className={cn('max-w-[450px] overflow-auto bg-white p-10', className)}>
        <Root>
          <Dialog.DialogTitle>Title</Dialog.DialogTitle>
        </Root>

        <div className="flex items-center justify-between">
          <div>
            <Title text="Enter code" className="text-[30px] font-semibold" />
            <p className="text-sm">
              Verification code was sent to <br /> your email
            </p>
          </div>
          <div>
            <Image src="/assets/images/numbers-icon.png" alt="number-icon" width={60} height={60} />
          </div>
        </div>
        <div className="mb-6 flex items-center justify-center">
          <CodeVerification length={6} value={value} onChange={(value) => setValue(value)} />
        </div>
        {email && (
          <Button
            onClick={handleRequestNewCode}
            loading={isVerificationLoading || requestNewCodeLoading}
            disabled={!isRequestActive}
            className="h-[55px]"
          >
            {isRequestActive ? 'Request new code' : `Request new code - after ${timeLeft} sec`}
          </Button>
        )}
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
