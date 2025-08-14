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
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <h2 className='text-lg font-semibold'>Tasks</h2>
          <Badge variant='secondary' className='rounded-md px-2 py-0.5 text-xs'>
            {filteredTasks.length}
          </Badge>
        </div>
        <CreateTask />
      </div>

      <div className='bg-muted/50 flex items-center gap-1 rounded-lg p-1'>
        <Button
          variant={filter === 'all' ? 'default' : 'ghost'}
          size='sm'
          onClick={() => setFilter('all')}
          className='h-8 rounded-md px-3 text-sm'
        >
          All ({stats.total})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'ghost'}
          size='sm'
          onClick={() => setFilter('pending')}
          className='h-8 rounded-md px-3 text-sm'
        >
          <Clock className='mr-1.5 h-3 w-3' />
          Pending ({stats.pending})
        </Button>
        <Button
          variant={filter === 'finished' ? 'default' : 'ghost'}
          size='sm'
          onClick={() => setFilter('finished')}
          className='h-8 rounded-md px-3 text-sm'
        >
          <CheckCircle2 className='mr-1.5 h-3 w-3' />
          Finished ({stats.finished})
        </Button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <div className='bg-muted/50 mb-4 rounded-xl p-4'>
            <Plus className='text-muted-foreground mx-auto h-8 w-8' />
          </div>
          <h3 className='mb-2 text-base font-medium'>
            {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
          </h3>
          <p className='text-muted-foreground mb-6 max-w-xs text-sm'>
            {filter === 'all'
              ? 'Create your first task to get started'
              : `No ${filter} tasks at the moment`}
          </p>
          {filter === 'all' && (
            <div className='w-full max-w-md'>
              <CreateTask variant='inline' />
            </div>
          )}
        </div>
      ) : (
        <div className='space-y-3'>
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
