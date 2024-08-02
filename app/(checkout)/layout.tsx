import type { Metadata } from 'next'
import '../globals.css'
import { Container, Header } from '@/shared/components/shared'

export const metadata: Metadata = {
    title: 'Next Pizza | Checkout',
    description: 'The best pizza in town!',
}

export default function CheckoutLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
}>) {
    return (
        <main className="min-h-screen bg-[#f4f1ee]">
            <Header
                className=" border-b-gray-200"
                hasSearch={false}
                hasCart={false}
            />
            {children}
        </main>
    )
}
