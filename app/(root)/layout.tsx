import React from 'react'
import type { Metadata } from 'next'

import { Header } from '@/shared/components/shared/header'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Next Pizza | Main',
  description: 'The best pizza in town!',
}

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <main className="min-h-screen">
      <React.Suspense>
        <Header />
      </React.Suspense>
      {children}
      {modal}
    </main>
  )
}
