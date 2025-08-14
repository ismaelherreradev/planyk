'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Plus, Search } from 'lucide-react'

import { Paths } from '@/config/site'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import CreateList from '@/components/create-list'

interface _List {
  id: number
  title: string
  color: string
  emoji: string
  listType: 'color' | 'emoji'
}

interface Task {
  id: number
  status: 'pending' | 'finished' | 'deleted'
}

interface ListWithTasks {
  id: number
  title: string
  color: string
  emoji: string
  listType: 'color' | 'emoji'
  tasks: Task[]
}

function ListsGrid({ lists, searchQuery }: { lists: ListWithTasks[]; searchQuery: string }) {
  const filteredLists = useMemo(() => {
    if (!searchQuery.trim()) return lists
    return lists.filter(list => list.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [lists, searchQuery])

  if (!lists || lists.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <div className='bg-muted/30 mb-4 rounded-xl p-3'>
          <Plus className='text-muted-foreground h-8 w-8' aria-hidden='true' />
        </div>
        <h2 className='mb-2 text-lg font-medium'>Create your first list</h2>
        <p className='text-muted-foreground mb-6 max-w-sm text-center text-sm'>
          Start organizing your tasks by creating your first list
        </p>
        <CreateList />
      </div>
    )
  }

  if (filteredLists.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <div className='bg-muted/30 mb-4 rounded-xl p-3'>
          <Search className='text-muted-foreground h-8 w-8' aria-hidden='true' />
        </div>
        <h2 className='mb-2 text-lg font-medium'>No lists found</h2>
        <p className='text-muted-foreground mb-6 max-w-sm text-center text-sm'>
          Try adjusting your search terms
        </p>
      </div>
    )
  }

  return (
    <>
      {filteredLists.map(listWithTasks => {
        const list = listWithTasks
        const tasks = listWithTasks.tasks
        const activeTasks = tasks.filter(task => task.status !== 'deleted')
        const finishedTasks = activeTasks.filter(task => task.status === 'finished')
        const progressPercentage =
          activeTasks.length > 0 ? Math.round((finishedTasks.length / activeTasks.length) * 100) : 0

        return (
          <Link
            key={list.id}
            href={`${Paths.ListsPage}/${list.id}`}
            className='group focus-visible:ring-ring block rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
            aria-label={`${list.title} - ${activeTasks.length} tasks, ${progressPercentage}% complete`}
          >
            <Card className='bg-card/60 hover:bg-card border-border/60 hover:border-border h-full cursor-pointer backdrop-blur-sm transition-all duration-200 hover:shadow-sm'>
              <CardContent className='p-4'>
                <div className='mb-3 flex items-center gap-2'>
                  {list.listType === 'emoji' ? (
                    <div className='bg-muted/20 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg'>
                      <span className='text-sm' aria-hidden='true'>
                        {list.emoji.startsWith('http') ? '📝' : list.emoji}
                      </span>
                    </div>
                  ) : (
                    <div
                      className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg'
                      style={{ backgroundColor: list.color + '15' }}
                    >
                      <div
                        className='h-3 w-3 rounded-full'
                        style={{ backgroundColor: list.color }}
                        aria-hidden='true'
                      />
                    </div>
                  )}

                  <div className='min-w-0 flex-1'>
                    <h3 className='truncate text-sm leading-tight font-medium'>{list.title}</h3>
                  </div>

                  <Badge
                    variant='secondary'
                    className='bg-muted/50 text-muted-foreground hover:bg-muted/70 h-5 min-w-0 px-1.5 text-xs font-medium tabular-nums'
                  >
                    {activeTasks.length}
                  </Badge>
                </div>

                {activeTasks.length > 0 ? (
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between text-xs'>
                      <span className='text-muted-foreground'>Progress</span>
                      <div className='flex items-center gap-2'>
                        {finishedTasks.length > 0 && (
                          <Badge
                            variant='outline'
                            className='h-4 border-emerald-200/60 bg-emerald-50/80 px-1 text-xs font-medium text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-300'
                          >
                            {finishedTasks.length} done
                          </Badge>
                        )}
                        <span className='text-muted-foreground font-medium tabular-nums'>
                          {progressPercentage}%
                        </span>
                      </div>
                    </div>
                    <div
                      className='bg-muted/40 h-1.5 w-full overflow-hidden rounded-full'
                      role='progressbar'
                      aria-valuenow={progressPercentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${progressPercentage}% complete`}
                    >
                      <div
                        className='bg-primary h-full rounded-full transition-all duration-700 ease-out'
                        style={{
                          width: `${progressPercentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center justify-center py-3'>
                    <p className='text-muted-foreground text-xs'>No tasks yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </>
  )
}

export default function PlanykPage({ lists }: { lists: ListWithTasks[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='container mx-auto max-w-7xl px-4 py-8'>
      <div className='mb-8'>
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Lists</h1>
            <p className='text-muted-foreground mt-1 text-sm'>
              Organize and manage your tasks efficiently
            </p>
          </div>
          <CreateList />
        </div>

        <div className='relative max-w-sm'>
          <Search
            className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2'
            aria-hidden='true'
          />
          <Input
            placeholder='Search lists...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='bg-muted/20 focus:bg-background border-border/60 focus:border-border h-9 pl-9 text-sm transition-all duration-200'
            aria-label='Search through your lists'
          />
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        <ListsGrid lists={lists} searchQuery={searchQuery} />
      </div>
    </div>
  )
}
