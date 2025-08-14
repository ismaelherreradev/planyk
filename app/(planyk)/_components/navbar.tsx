'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { CreateTaskFormProps } from '@/types'

import { Paths, SiteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ThemeToggle } from '@/components/theme-toggle'

import { CreateListButtonWithTooltip } from './create-list/create-list-button'
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
    <header className='bg-background sticky top-0 flex h-28 items-center gap-4'>
      <nav className='flex w-full items-center justify-between'>
        <div className='flex items-center space-x-2 md:space-x-5'>
          <Link
            href={Paths.ListsPage}
            className='hidden items-center gap-2 text-5xl font-bold md:mr-5 md:flex'
          >
            <span>{SiteConfig.title}</span>
          </Link>

          <div className='flex items-center space-x-1'>
            <Select value={selectedValue} onValueChange={handleValueChange}>
              <SelectTrigger className='w-[180px] rounded-3xl md:w-[280px]'>
                <SelectValue placeholder='No lists' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lists</SelectLabel>
                  {lists.map(({ list, tasks }) => (
                    <MemoizedListItem key={list.id} list={list} tasks={tasks} />
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <CreateListButtonWithTooltip />
        </div>
        <div className='flex space-x-3'>
          <UserClerkButton />
          <div className='hidden md:block'>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
