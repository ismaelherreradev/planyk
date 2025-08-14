'use client'

import { statusEnum, type SelectTask } from '@/db/schema'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarClockIcon } from 'lucide-react'
import { useServerAction } from 'zsa-react'

import { formatDateToLocal } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { updateStateTask } from '@/app/(planyk)/_actions'

import TaskOptions from './task-options'

const statusColorMap = {
  pending: 'bg-yellow-700',
  finished: 'bg-green-700',
  deleted: 'bg-red-700',
}

export default function TaskItem({ task }: { task: SelectTask }) {
  const { isPending, execute } = useServerAction(updateStateTask)

  return (
    <AnimatePresence>
      {!isPending && (
        <motion.li
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className='bg-muted/50 flex items-center rounded-xl px-4 py-3'
        >
          <Checkbox
            checked={task.status === statusEnum.FINISHED}
            onCheckedChange={async checked => {
              if (checked) {
                execute({
                  id: task.id,
                  status: statusEnum.FINISHED,
                })
              } else {
                execute({
                  id: task.id,
                  status: statusEnum.PENDING,
                })
              }
            }}
            className='mr-2'
          />
          <span>{task.title}</span>
          <Badge variant={'default'} className={`ml-3 ${statusColorMap[task.status]}`}>
            {task.status}
          </Badge>
          <div className='bg-muted ml-auto flex items-center space-x-2 rounded-lg px-3 py-2 text-xs'>
            <CalendarClockIcon size={14} />
            <span>{formatDateToLocal(task.dateTime)}</span>
          </div>
          <TaskOptions id={task.id} status={task.status} />
        </motion.li>
      )}
    </AnimatePresence>
  )
}
