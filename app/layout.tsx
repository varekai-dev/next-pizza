import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
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
                {children}
                <Toaster position="top-right" />
            </body>
        </html>
    )
}
