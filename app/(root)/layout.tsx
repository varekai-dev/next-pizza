import type { Metadata } from 'next'
import '../globals.css'
import { Header } from '@/components/shared/header'

export const metadata: Metadata = {
    title: 'Next Pizza | Main',
    description: 'The best pizza in town!',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="min-h-screen">
            <Header />
            {children}
        </main>
    )
}
