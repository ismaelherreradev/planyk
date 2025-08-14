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
        <div className='bg-muted/50 mb-4 rounded-2xl p-4'>
          <Plus className='text-muted-foreground mx-auto h-12 w-12' />
        </div>
        <h2 className='mb-2 text-lg font-medium'>Create your first list</h2>
        <p className='text-muted-foreground mb-6 max-w-sm text-sm'>
          Start organizing your tasks by creating your first list
        </p>
        <CreateList />
      </div>
    )
  }

  if (filteredLists.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <div className='bg-muted/50 mb-4 rounded-2xl p-4'>
          <Search className='text-muted-foreground mx-auto h-12 w-12' />
        </div>
        <h2 className='mb-2 text-lg font-medium'>No lists found</h2>
        <p className='text-muted-foreground mb-6 max-w-sm text-sm'>
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

        return (
          <Link key={list.id} href={`${Paths.ListsPage}/${list.id}`}>
            <Card className='group bg-card/50 hover:bg-card/80 h-full cursor-pointer border-0 backdrop-blur-sm transition-all duration-200 hover:shadow-sm'>
              <CardContent className='flex h-full flex-col p-4'>
                <div className='mb-4 flex items-center gap-3'>
                  {list.listType === 'emoji' ? (
                    <div className='bg-muted/30 flex-shrink-0 rounded-lg p-1.5'>
                      <span className='text-base'>
                        {list.emoji.startsWith('http') ? '😀' : list.emoji}
                      </span>
                    </div>
                  ) : (
                    <div
                      className='flex-shrink-0 rounded-lg p-1.5'
                      style={{ backgroundColor: list.color + '20' }}
                    >
                      <div
                        className='h-4 w-4 rounded-full'
                        style={{ backgroundColor: list.color }}
                      />
                    </div>
                  )}
                  <div className='min-w-0 flex-1'>
                    <div className='mb-1 flex items-center gap-2'>
                      <h3 className='truncate text-sm font-medium'>{list.title}</h3>
                      <Badge variant='secondary' className='rounded-md px-1.5 py-0.5 text-xs'>
                        {activeTasks.length}
                      </Badge>
                    </div>
                    {finishedTasks.length > 0 && (
                      <Badge
                        variant='outline'
                        className='rounded-md border-green-200 bg-green-50 px-1.5 py-0.5 text-xs text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
                      >
                        {finishedTasks.length} done
                      </Badge>
                    )}
                  </div>
                </div>

                <div className='flex flex-1 flex-col justify-end'>
                  {activeTasks.length > 0 ? (
                    <div className='space-y-2'>
                      <div className='text-muted-foreground mb-1 flex justify-between text-xs'>
                        <span>Progress</span>
                        <span className='font-medium'>
                          {Math.round((finishedTasks.length / activeTasks.length) * 100)}%
                        </span>
                      </div>
                      <div className='bg-muted/40 h-1 w-full overflow-hidden rounded-full'>
                        <div
                          className='bg-primary h-full rounded-full transition-all duration-500'
                          style={{
                            width: `${(finishedTasks.length / activeTasks.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='py-2 text-center'>
                      <p className='text-muted-foreground text-xs'>No tasks yet</p>
                    </div>
                  )}
                </div>
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
          <h1 className='text-2xl font-semibold tracking-tight'>Lists</h1>
          <CreateList />
        </div>
        <div className='mb-2 flex items-center gap-4'>
          <p className='text-muted-foreground text-sm'>
            Organize and manage your tasks efficiently
          </p>
          <div className='relative ml-auto max-w-sm flex-1'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform' />
            <Input
              placeholder='Search lists...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='bg-muted/30 focus:bg-background h-9 border-0 pl-9 transition-colors'
            />
          </div>
        </div>
      </div>

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        <ListsGrid lists={lists} searchQuery={searchQuery} />
      </div>
    </div>
  )
}
