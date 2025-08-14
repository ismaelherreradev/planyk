'use client'

import { memo, useState, useTransition } from 'react'
import { statusEnum, type SelectTask } from '@/db/schema'
import { CalendarIcon } from 'lucide-react'

import { cn, formatDateToLocal } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { updateTaskStatus } from '@/app/(planyk)/_actions'

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

  return (
    <div
      className={cn(
        'group bg-background flex items-center gap-4 rounded-xl border-0 p-4 shadow-sm transition-all duration-200 hover:shadow-md',
        optimisticStatus === statusEnum.FINISHED && 'opacity-70',
        optimisticStatus === statusEnum.DELETED && 'opacity-50',
        isPending && 'animate-pulse'
      )}
    >
      <Checkbox
        checked={optimisticStatus === statusEnum.FINISHED}
        onCheckedChange={handleStatusChange}
        disabled={isPending || optimisticStatus === statusEnum.DELETED}
        className='h-3 w-3'
      />

      <div className='min-w-0 flex-1'>
        <p
          className={cn(
            'mb-1 font-medium',
            optimisticStatus === statusEnum.FINISHED && 'text-muted-foreground line-through',
            optimisticStatus === statusEnum.DELETED && 'text-muted-foreground line-through'
          )}
        >
          {task.title}
        </p>
        <div className='text-muted-foreground flex items-center gap-2 text-xs'>
          <CalendarIcon className='h-3 w-3' />
          <span>{formatDateToLocal(task.dateTime)}</span>
        </div>
      </div>

      <div className='opacity-0 transition-opacity group-hover:opacity-100'>
        <TaskOptions id={task.id} status={optimisticStatus} />
      </div>
    </div>
  )
})

export default TaskItem
