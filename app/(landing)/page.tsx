import Image from 'next/image'
import Link from 'next/link'
import { BarChart3, CheckCircle2, Target, Zap } from 'lucide-react'

import { Paths, SiteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: CheckCircle2,
    title: 'Simple Task Management',
    description:
      'Create, organize, and complete tasks with an intuitive interface designed for productivity.',
  },
  {
    icon: Target,
    title: 'Smart Organization',
    description:
      'Group tasks into lists with custom colors and emojis for better visual organization.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Monitor your productivity with clear progress indicators and completion statistics.',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description:
      'Built for speed with a clean, distraction-free experience that keeps you focused.',
  },
]

export default function LandingPage() {
  return (
    <div className='flex min-h-[calc(100vh-5rem)] flex-col'>
      <section className='flex flex-1 items-center justify-center py-20'>
        <div className='container max-w-4xl text-center'>
          <div className='mb-8 flex justify-center'>
            <div className='from-primary/10 to-primary/5 rounded-2xl bg-gradient-to-br p-6'>
              <Image
                src='/planyk.svg'
                alt='Planyk logo - Modern task management'
                width={64}
                height={64}
                className='h-16 w-16'
                priority
              />
            </div>
          </div>

          <h1 className='mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl'>
            Simplify todo management with{' '}
            <span className='from-primary to-primary/80 bg-gradient-to-br bg-clip-text text-transparent'>
              {SiteConfig.title}
            </span>
          </h1>

          <p className='text-muted-foreground mx-auto mb-12 max-w-2xl text-xl text-balance'>
            Focus on what matters most. Create lists, track progress, and achieve your goals with a
            clean, distraction-free task management experience.
          </p>

          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='px-8 py-6 text-lg' asChild>
              <Link href={Paths.SignUpPage}>Get Started Free</Link>
            </Button>
            <Button size='lg' variant='outline' className='px-8 py-6 text-lg' asChild>
              <Link href={Paths.SignInPage}>Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className='bg-muted/30 py-24'>
        <div className='container max-w-6xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-3xl font-bold tracking-tight md:text-4xl'>
              Everything you need to stay productive
            </h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl text-balance'>
              Powerful features designed to help you organize your work and life efficiently.
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className='group bg-card/50 hover:bg-card/80 focus-within:ring-primary/20 flex flex-col items-start rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 focus-within:ring-2 hover:shadow-sm'
                  tabIndex={0}
                  role='article'
                  aria-labelledby={`feature-${index}-title`}
                  aria-describedby={`feature-${index}-description`}
                >
                  <div className='bg-primary/10 group-hover:bg-primary/15 mb-4 rounded-xl p-3 transition-colors duration-300'>
                    <Icon className='text-primary h-6 w-6' aria-hidden='true' />
                  </div>
                  <h3
                    id={`feature-${index}-title`}
                    className='mb-2 text-lg font-semibold tracking-tight'
                  >
                    {feature.title}
                  </h3>
                  <p
                    id={`feature-${index}-description`}
                    className='text-muted-foreground leading-relaxed text-balance'
                  >
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
