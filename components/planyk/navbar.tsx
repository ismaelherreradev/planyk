'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { CreateTaskFormProps } from '@/types'

import { Paths, SiteConfig } from '@/config/site'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ThemeToggle } from '@/components/theme-toggle'

import { UserClerkButton } from './navbar-items'
import { MemoizedListItem } from './select-list-items'

export default function Navbar({ lists }: CreateTaskFormProps) {
  const router = useRouter()
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    const storedValue = localStorage.getItem('selectedList')
    if (storedValue) {
      setSelectedValue(storedValue)
    }
  }, [])

  const handleValueChange = useCallback(
    (value: string) => {
      localStorage.setItem('selectedList', value)
      setSelectedValue(value)
      router.replace(`${Paths.ListsPage}/${value}`)
    },
    [router]
  )

  return (
    <header className='bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-md'>
      <div className='container mx-auto max-w-7xl px-4'>
        <nav className='flex h-16 items-center justify-between'>
          <div className='flex items-center space-x-8'>
            <Link
              href={Paths.ListsPage}
              className='hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:ring-ring flex items-center gap-3 rounded-lg p-2 transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none'
              aria-label={`${SiteConfig.title} dashboard`}
            >
              <div className='from-primary/10 to-primary/5 rounded-lg bg-gradient-to-br p-1.5'>
                <Image
                  src='/planyk.svg'
                  alt={`${SiteConfig.title} logo`}
                  width={20}
                  height={20}
                  className='h-5 w-5'
                  priority
                />
              </div>
              <span className='text-lg font-bold tracking-tight'>{SiteConfig.title}</span>
            </Link>

            {lists.length > 0 && (
              <Select value={selectedValue} onValueChange={handleValueChange}>
                <SelectTrigger className='bg-muted/50 focus:ring-primary/20 h-9 w-52 border-0 shadow-none focus:ring-1'>
                  <SelectValue placeholder='Switch list' />
                </SelectTrigger>
                <SelectContent align='start' className='w-52'>
                  <SelectGroup>
                    <SelectLabel className='text-muted-foreground px-2 py-1.5 text-xs font-medium tracking-wider uppercase'>
                      Your Lists
                    </SelectLabel>
                    {lists.map(({ list, tasks }) => (
                      <MemoizedListItem key={list.id} list={list} tasks={tasks} />
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <ThemeToggle />
            <UserClerkButton />
          </div>
        </nav>
      </div>
    </header>
  )
}
