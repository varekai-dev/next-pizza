import React from 'react'
import type { Metadata } from 'next'

import { Header } from '@/shared/components/shared'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Next Pizza | Checkout',
  description: 'The best pizza in town!',
}

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <React.Suspense>
        <Header className="border-b-gray-200" hasSearch={false} hasCart={false} />
      </React.Suspense>

      {children}
    </main>
  )
}
