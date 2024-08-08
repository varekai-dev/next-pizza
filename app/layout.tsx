import { Nunito } from 'next/font/google'

import { Providers } from '@/shared/components/shared'

import './globals.css'

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
