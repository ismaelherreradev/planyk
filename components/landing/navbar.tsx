import Image from 'next/image'
import Link from 'next/link'

import { Paths, SiteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
  return (
    <nav
      className='bg-background/80 fixed inset-x-0 top-0 z-50 flex h-20 border-b backdrop-blur-md'
      role='navigation'
      aria-label='Main navigation'
    >
      <div className='container flex w-full items-center justify-between'>
        <Link
          href={Paths.LandingPage}
          className='hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:ring-ring flex items-center gap-3 rounded-lg p-2 transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none'
          aria-label={`${SiteConfig.title} homepage`}
        >
          <div className='from-primary/10 to-primary/5 rounded-lg bg-gradient-to-br p-2'>
            <Image
              src='/planyk.svg'
              alt={`${SiteConfig.title} logo`}
              width={24}
              height={24}
              className='h-6 w-6'
              priority
            />
          </div>
          <span className='text-xl font-bold tracking-tight'>{SiteConfig.title}</span>
        </Link>

        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variant='ghost'
            className='text-muted-foreground hover:text-foreground'
            asChild
          >
            <Link href={Paths.SignInPage}>Sign In</Link>
          </Button>
          <Button size='sm' className='px-4' asChild>
            <Link href={Paths.SignUpPage}>Get Started</Link>
          </Button>
          <div className='ml-2'>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
