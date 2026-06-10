import type { Metadata, Viewport } from 'next'
import { Fraunces, Plus_Jakarta_Sans, Libre_Baskerville, JetBrains_Mono, Caveat } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// Logo wordmark (canon §18.1): cons/.ai = Plus Jakarta Sans → --font-logo
const plusJakartaLogo = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-logo',
  display: 'swap',
})

// Logo "i" (canon §18.1): Libre Baskerville RETO → --font-logo-i
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-logo-i',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'tutor',
  description: 'Tutor educacional com IA — construtor de apps por voz',
}

export const viewport: Viewport = {
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${plusJakarta.variable} ${plusJakartaLogo.variable} ${libreBaskerville.variable} ${jetbrains.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
