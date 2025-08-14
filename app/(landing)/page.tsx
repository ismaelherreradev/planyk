import Image from 'next/image'
import Link from 'next/link'

import { SiteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BorderBeam } from '@/components/border-beam'

import landingImg from './landing-page.png'

export default function LandingPage() {
  return (
    <div className='container flex flex-col items-center justify-center overflow-x-hidden overflow-y-hidden'>
      <div className={cn('mb-4 flex flex-col items-center justify-center')}>
        <h1 className='mb-6 text-center text-xl md:text-6xl'>
          Simplify todo management with Planyk
        </h1>
      </div>

      <div className='relative rounded-xl'>
        <BorderBeam />
        <Image src={landingImg} alt='Tasky Board' className='rounded-xl' priority />
      </div>

      <Button className='mt-6' size='lg' asChild>
        <Link href='/sign-up'>Get {SiteConfig.title}</Link>
      </Button>
    </div>
  )
}
