import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import './globals.css'

import { env } from '@/env'
import { ClerkProvider } from '@clerk/nextjs'

import { SiteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: SiteConfig.title,
    template: '%s | ' + SiteConfig.title,
  },
  description: SiteConfig.description,
  icons: [
    {
      url: '/planyk.svg',
      href: '/planyk.svg',
    },
  ],
  openGraph: {
    images: ['/planyk.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang='en' suppressHydrationWarning>
        <body className={cn('bg-background min-h-svh font-sans antialiased', fontSans.variable)}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
