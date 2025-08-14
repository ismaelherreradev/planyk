'use client'

import { memo, useState, useTransition } from 'react'
import { updateTaskStatus } from '@/actions'
import { statusEnum, type SelectTask } from '@/db/schema'
import { CalendarIcon } from 'lucide-react'

import { cn, formatDateToLocal } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'

import TaskOptions from './task-options'

const TaskItem = memo(function TaskItem({ task }: { task: SelectTask }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticStatus, setOptimisticStatus] = useState(task.status)

  const handleStatusChange = (checked: boolean) => {
    const newStatus = checked ? statusEnum.FINISHED : statusEnum.PENDING
    setOptimisticStatus(newStatus)

    startTransition(async () => {
      try {
        await updateTaskStatus(task.id, newStatus)
      } catch {
        setOptimisticStatus(task.status)
      }
    })
  }

  const isCompleted = optimisticStatus === statusEnum.FINISHED
  const isDeleted = optimisticStatus === statusEnum.DELETED

  return (
    <div
      className={cn(
        'group bg-card/60 hover:bg-card border-border/60 hover:border-border focus-within:ring-primary/20 flex items-center gap-3 rounded-xl border p-3 backdrop-blur-sm transition-all duration-200 focus-within:ring-2 hover:shadow-sm',
        (isCompleted || isDeleted) && 'opacity-60',
        isPending && 'animate-pulse'
      )}
      role='article'
      aria-label={`Task: ${task.title}`}
    >
      <Checkbox
        checked={isCompleted}
        onCheckedChange={handleStatusChange}
        disabled={isPending || isDeleted}
        className='h-4 w-4 flex-shrink-0'
        aria-label={`Mark "${task.title}" as ${isCompleted ? 'pending' : 'completed'}`}
      />

      <div className='min-w-0 flex-1'>
        <p
          className={cn(
            'mb-1 text-sm leading-tight font-medium transition-all duration-200',
            isCompleted && 'text-muted-foreground line-through',
            isDeleted && 'text-muted-foreground line-through'
          )}
        >
          {task.title}
        </p>
        <div className='text-muted-foreground flex items-center gap-1.5 text-xs'>
          <CalendarIcon className='h-3 w-3 flex-shrink-0' aria-hidden='true' />
          <time dateTime={task.dateTime}>{formatDateToLocal(task.dateTime)}</time>
        </div>
      </div>

      <div
        className={cn(
          'flex-shrink-0 opacity-0 transition-opacity duration-200',
          'group-focus-within:opacity-100 group-hover:opacity-100',
          (isCompleted || isDeleted) && 'opacity-100'
        )}
      >
        <TaskOptions id={task.id} status={optimisticStatus} />
      </div>
    </div>
  )
})

export default TaskItem
