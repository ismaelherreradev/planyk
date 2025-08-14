'use client'

import { useActionState, useCallback, useEffect, useState, useTransition } from 'react'
import { createTask } from '@/actions'
import { useAllLists, useCurrentList } from '@/contexts/list-context'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Calendar as CalendarIcon, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const initialState = {
  message: '',
  errors: {},
}

interface CreateTaskFormProps {
  variant?: 'popover' | 'inline'
  className?: string
}

export default function CreateTaskForm({ variant = 'popover', className }: CreateTaskFormProps) {
  const currentList = useCurrentList()
  const allLists = useAllLists()

  const [state, formAction, isPending] = useActionState(createTask, initialState)
  const [isTransitionPending, startTransition] = useTransition()

  const [formData, setFormData] = useState({
    title: '',
    selectedDate: new Date(),
    selectedListId: currentList?.id.toString() ?? '',
  })

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      selectedDate: new Date(),
      selectedListId: currentList?.id.toString() ?? '',
    })
  }, [currentList])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formDataObj = new FormData(event.currentTarget)
      startTransition(() => {
        formAction(formDataObj)
      })
    },
    [formAction, startTransition]
  )

  useEffect(() => {
    if (state?.success) {
      resetForm()
    }
  }, [state?.success, resetForm])

  const showListSelector = !currentList || allLists.length > 1
  const selectedList =
    currentList ?? allLists.find(list => list.id.toString() === formData.selectedListId)

  const TaskForm = () => (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-3'>
        <div className='relative'>
          <Input
            name='title'
            placeholder={currentList ? `Add task to ${currentList.title}` : 'Task title'}
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className={cn('pr-4', state?.errors?.title && 'border-red-500')}
            required
          />
          {state?.errors?.title && (
            <p className='mt-1 text-xs text-red-500'>{state.errors.title[0]}</p>
          )}
        </div>

        {showListSelector && (
          <Select
            name='listId'
            value={formData.selectedListId}
            onValueChange={value => setFormData(prev => ({ ...prev, selectedListId: value }))}
            required
          >
            <SelectTrigger className={cn(state?.errors?.listId && 'border-red-500')}>
              <SelectValue placeholder='Select a list' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Your Lists</SelectLabel>
                {allLists.map(list => (
                  <SelectItem key={list.id} value={list.id.toString()}>
                    <div className='flex items-center gap-2'>
                      {list.listType === 'emoji' ? (
                        <span>{list.emoji}</span>
                      ) : (
                        <div
                          className='h-3 w-3 rounded-full border'
                          style={{ backgroundColor: list.color }}
                        />
                      )}
                      <span className='truncate'>{list.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {!showListSelector && currentList && (
          <input type='hidden' name='listId' value={currentList.id.toString()} />
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'w-full justify-start text-left font-normal',
                !formData.selectedDate && 'text-muted-foreground'
              )}
              type='button'
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {formData.selectedDate ? formData.selectedDate.toLocaleDateString() : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={formData.selectedDate}
              onSelect={date => date && setFormData(prev => ({ ...prev, selectedDate: date }))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <input type='hidden' name='dateTime' value={formData.selectedDate.toISOString()} />

        {selectedList && (
          <div className='bg-muted/50 flex items-center gap-2 rounded p-2'>
            <span className='text-muted-foreground text-xs'>Adding to:</span>
            <Badge variant='secondary' className='text-xs'>
              {selectedList.title}
            </Badge>
          </div>
        )}

        {state?.message && !state?.success && (
          <div className='rounded border border-red-200 bg-red-50 p-2'>
            <p className='text-xs text-red-600'>{state.message}</p>
          </div>
        )}
      </div>

      <Button
        type='submit'
        className='w-full'
        disabled={
          isPending || isTransitionPending || !formData.title.trim() || !formData.selectedListId
        }
      >
        {isPending || isTransitionPending ? (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Creating...
          </>
        ) : (
          <>
            <Plus className='mr-2 h-4 w-4' />
            Add Task
          </>
        )}
      </Button>
    </form>
  )

  if (variant === 'inline') {
    return (
      <div className={cn('w-full', className)}>
        <TaskForm />
      </div>
    )
  }

  return <TaskForm />
}
