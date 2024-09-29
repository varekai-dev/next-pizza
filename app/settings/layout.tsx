import React from 'react'
import type { Metadata } from 'next'

import { Container, Header, SettingNavigation } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Next Pizza | Settings',
  description: 'The best pizza in town!',
}

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getUserSession()
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <React.Suspense>
        <Header className="border-b-gray-200 bg-white" hasSearch={false} hasCart={false} />
      </React.Suspense>
      <Container className="h-[calc(100vh-109px)]">
        <div className="flex h-full flex-col-reverse justify-between gap-5 py-5 md:flex-row md:justify-normal">
          <SettingNavigation role={session?.role} />
          {children}
        </div>
      </Container>
    </main>
  )
}
