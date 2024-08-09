'use client'

import React from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Route } from '@/@types'
import { cn } from '@/shared/lib/utils'

import { CartButton } from './cart'
import { Container } from './container'
import { AuthModal } from './modals/auth-modal'
import { SearchInput } from './search-input'
import { SettingButton } from './settings'

interface Props {
  className?: string
  hasSearch?: boolean
  hasCart?: boolean
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  React.useEffect(() => {
    let message = ''
    if (searchParams.has('success')) {
      message = 'Order paid successfully'
    }
    if (searchParams.has('verified')) {
      message = 'Email verified successfully'
    }
    if (message) {
      setTimeout(() => {
        router.replace('/')
        toast.success(message)
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left part */}
        <Link href={Route.HOME}>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={35} height={35} alt="logo" />
            <div className="sm:block hidden">
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">Taste awesome</p>
            </div>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-10 flex-1 md:block hidden">
            <SearchInput />
          </div>
        )}

        {/* Right part */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => {
              setOpenAuthModal(false)
            }}
          />
          <SettingButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
