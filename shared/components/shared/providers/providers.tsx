'use client'

import React from 'react'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { CodeVerificationModal } from '../modals/code-verification-modal'
import { QueryProvider } from './query-provider'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <SessionProvider>
        <QueryProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </SessionProvider>
      <Toaster />
      <React.Suspense>
        <CodeVerificationModal />
      </React.Suspense>
    </>
  )
}
