import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eternum Mind',
  description: 'Unlock the full potential of your mental well-being journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
