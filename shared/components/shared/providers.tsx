'use client'

import React from 'react'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { CodeVerificationModal } from './modals/code-verification-modal'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <NextTopLoader showSpinner={false} />
            <SessionProvider>{children}</SessionProvider>
            <Toaster />
            <React.Suspense>
                <CodeVerificationModal />
            </React.Suspense>
        </>
    )
}
