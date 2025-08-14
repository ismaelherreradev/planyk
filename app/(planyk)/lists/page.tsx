import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { getListsWithAllTasks } from '@/db/query'
import { currentUser } from '@clerk/nextjs/server'

import { Card, CardContent } from '@/components/ui/card'

import PlanykPage from './lists-client'

async function ListsPageWrapper() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const lists = await getListsWithAllTasks()

  return (
    <Suspense
      fallback={
        <div className='container mx-auto max-w-7xl px-4 py-8'>
          <div className='mb-8'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='bg-muted h-8 w-16 animate-pulse rounded' />
              <div className='bg-muted h-9 w-24 animate-pulse rounded' />
            </div>
            <div className='mb-2 flex items-center gap-4'>
              <div className='bg-muted h-4 w-64 animate-pulse rounded' />
              <div className='relative ml-auto max-w-sm flex-1'>
                <div className='bg-muted h-9 w-full animate-pulse rounded' />
              </div>
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className='bg-card/50 h-full animate-pulse border-0'>
                <CardContent className='flex h-full flex-col p-4'>
                  <div className='mb-4 flex items-center gap-3'>
                    <div className='bg-muted h-8 w-8 rounded-lg' />
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-center gap-2'>
                        <div className='bg-muted h-3 w-20 rounded' />
                        <div className='bg-muted h-4 w-6 rounded' />
                      </div>
                      <div className='bg-muted h-2 w-12 rounded' />
                    </div>
                  </div>
                  <div className='flex flex-1 flex-col justify-end'>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <div className='bg-muted h-2 w-12 rounded' />
                        <div className='bg-muted h-2 w-6 rounded' />
                      </div>
                      <div className='bg-muted h-1 w-full rounded-full' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      }
    >
      <PlanykPage lists={lists ?? []} />
    </Suspense>
  )
}

export default ListsPageWrapper
