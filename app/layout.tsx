import type { Metadata } from 'next'

import './globals.css'

import { Inter as FontSans } from 'next/font/google'
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
    <html lang='en' suppressHydrationWarning>
      <body className={cn('bg-background min-h-svh font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
