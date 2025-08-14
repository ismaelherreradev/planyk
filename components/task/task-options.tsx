'use client'

import { useTransition } from 'react'
import { updateTaskStatus } from '@/actions'
import { statusEnum, type Status } from '@/db/schema'
import { RotateCcw, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function TaskOptions({ id, status }: { id: number; status: Status }) {
  const [isPending, startTransition] = useTransition()

  const handleStatusChange = (newStatus: Status) => {
    startTransition(async () => {
      try {
        await updateTaskStatus(id, newStatus)
      } catch {
        // Handle error silently for now
      }
    })
  }

  const isDeleted = status === statusEnum.DELETED

  return (
    <Button
      variant='ghost'
      size='sm'
      className='hover:bg-destructive/10 hover:text-destructive h-7 w-7 p-0 transition-all duration-200'
      disabled={isPending}
      onClick={() => handleStatusChange(isDeleted ? statusEnum.PENDING : statusEnum.DELETED)}
      aria-label={isDeleted ? 'Restore task' : 'Delete task'}
      title={isDeleted ? 'Restore task' : 'Delete task'}
    >
      {isDeleted ? (
        <RotateCcw className='h-3.5 w-3.5' aria-hidden='true' />
      ) : (
        <Trash2 className='h-3.5 w-3.5' aria-hidden='true' />
      )}
    </Button>
  )
}
