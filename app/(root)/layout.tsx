import type { Metadata } from 'next'
import '../globals.css'
import { Header } from '@/shared/components/shared/header'

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
            <Header />
            {children}
            {modal}
        </main>
    )
}
