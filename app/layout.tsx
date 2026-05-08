import type { Metadata } from 'next'
import { Orbitron, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/AuthContext'
import AuthModal from '@/components/AuthModal'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-orbitron',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Neon Syndicate — Dominate the Digital Arena',
  description:
    'Neon Syndicate is a cyberpunk esports hub. Watch live matches, explore the roster, and join the team.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} bg-[#0A0A0F]`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}