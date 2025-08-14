'use client'

import { useActionState, useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteList } from '@/actions'
import { ReloadIcon } from '@radix-ui/react-icons'
import { AlertTriangle, Trash2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

const initialState = {
  message: '',
}

export default function DeleteList({ id }: { id: number }) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(deleteList, initialState)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isTransitionPending, startTransition] = useTransition()

  function handleDelete() {
    const formData = new FormData()
    formData.append('id', id.toString())
    startTransition(() => {
      formAction(formData)
    })
  }

  useEffect(() => {
    if (state?.success) {
      router.push('/lists')
    }
  }, [state?.success, router])

  if (!showConfirm) {
    return (
      <Button
        variant='ghost'
        size='sm'
        className='text-muted-foreground hover:text-destructive h-8 w-8 p-0 transition-colors duration-200'
        onClick={() => setShowConfirm(true)}
        aria-label='Delete list'
        title='Delete list'
      >
        <Trash2 className='h-4 w-4' aria-hidden='true' />
      </Button>
    )
  }

  return (
    <div className='flex items-center gap-1'>
      <Button
        variant='outline'
        size='sm'
        className='h-8 w-8 p-0'
        onClick={() => setShowConfirm(false)}
        disabled={isPending || isTransitionPending}
        aria-label='Cancel delete'
      >
        <X className='h-3.5 w-3.5' aria-hidden='true' />
      </Button>
      <Button
        variant='destructive'
        size='sm'
        className='h-8 px-3'
        onClick={handleDelete}
        disabled={isPending || isTransitionPending}
        aria-label='Confirm delete list'
      >
        {isPending || isTransitionPending ? (
          <ReloadIcon className='h-3.5 w-3.5 animate-spin' aria-hidden='true' />
        ) : (
          <>
            <AlertTriangle className='mr-1 h-3.5 w-3.5' aria-hidden='true' />
            Delete
          </>
        )}
      </Button>
    </div>
  )
}
