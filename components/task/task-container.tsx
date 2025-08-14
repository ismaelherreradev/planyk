'use client'

import { memo, useMemo, useState } from 'react'
import type { SelectTask } from '@/db/schema'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Plus } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import CreateTask from '@/components/create-task'

import TaskItem from './task-item'

interface TasksContainerProps {
  tasks: SelectTask[]
}

const TasksContainer = memo(function TasksContainer({ tasks }: TasksContainerProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'finished'>('all')

  const { filteredTasks, stats } = useMemo(() => {
    const activeTasks = tasks.filter(task => task.status !== 'deleted')

    let filtered
    if (filter === 'all') {
      filtered = activeTasks
    } else {
      filtered = activeTasks.filter(task => task.status === filter)
    }

    const pendingTasks = activeTasks.filter(task => task.status === 'pending')
    const finishedTasks = activeTasks.filter(task => task.status === 'finished')

    return {
      filteredTasks: filtered,
      stats: {
        total: activeTasks.length,
        pending: pendingTasks.length,
        finished: finishedTasks.length,
      },
    }
  }, [tasks, filter])

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <h2 className='text-xl font-bold tracking-tight'>Tasks</h2>
          <Badge
            variant='secondary'
            className='bg-muted/50 text-muted-foreground hover:bg-muted/70 h-5 min-w-0 px-1.5 text-xs font-medium tabular-nums'
          >
            {filteredTasks.length}
          </Badge>
        </div>
        <CreateTask />
      </div>

      <div className='bg-muted/30 border-border/60 flex items-center gap-1 rounded-lg border p-1 backdrop-blur-sm'>
        <Button
          variant={filter === 'all' ? 'default' : 'ghost'}
          size='sm'
          onClick={() => setFilter('all')}
          className='h-7 rounded-md px-2.5 text-xs font-medium tabular-nums'
          aria-label={`Show all tasks (${stats.total} total)`}
        >
          All ({stats.total})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'ghost'}
          size='sm'
          onClick={() => setFilter('pending')}
          className='h-7 rounded-md px-2.5 text-xs font-medium tabular-nums'
          aria-label={`Show pending tasks (${stats.pending} pending)`}
        >
          <Clock className='mr-1 h-3 w-3' aria-hidden='true' />
          Pending ({stats.pending})
        </Button>
        <Button
          variant={filter === 'finished' ? 'default' : 'ghost'}
          size='sm'
          onClick={() => setFilter('finished')}
          className='h-7 rounded-md px-2.5 text-xs font-medium tabular-nums'
          aria-label={`Show finished tasks (${stats.finished} finished)`}
        >
          <CheckCircle2 className='mr-1 h-3 w-3' aria-hidden='true' />
          Finished ({stats.finished})
        </Button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 text-center'>
          <div className='bg-muted/30 mb-4 rounded-xl p-3'>
            <Plus className='text-muted-foreground h-8 w-8' aria-hidden='true' />
          </div>
          <h3 className='mb-2 text-lg font-medium'>
            {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
          </h3>
          <p className='text-muted-foreground mb-6 max-w-xs text-sm text-balance'>
            {filter === 'all'
              ? 'Create your first task to get started organizing your work'
              : `No ${filter} tasks at the moment`}
          </p>
          {filter === 'all' && (
            <div className='w-full max-w-md'>
              <CreateTask variant='inline' />
            </div>
          )}
        </div>
      ) : (
        <div className='space-y-2'>
          {filteredTasks.map(task => (
            <motion.div
              key={task.id}
              layout
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TaskItem task={task} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
})

export default TasksContainer
