'use client'

import { useActionState, useCallback, useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createList } from '@/actions'
import { type ListType } from '@/db/schema'
import { Palette, Plus, Smile } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ColorButton, listColors, type ListColor } from './color-button'
import { EmojiPicker } from './emoji-picker'

const initialState = {
  message: '',
  errors: {},
  success: false,
}

interface CreateListDialogProps {
  className?: string
}

export default function CreateListDialog({ className }: CreateListDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<ListColor>('red')
  const [listName, setListName] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('😀')
  const [listType, setListType] = useState<ListType>('color')

  const [state, formAction, isPending] = useActionState(createList, initialState)
  const [isTransitionPending, startTransition] = useTransition()

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formDataObj = new FormData()
      formDataObj.append('title', listName)
      formDataObj.append('color', selectedColor)
      formDataObj.append('emoji', selectedEmoji)
      formDataObj.append('listType', listType)

      startTransition(() => {
        formAction(formDataObj)
      })
    },
    [formAction, startTransition, listName, selectedColor, selectedEmoji, listType]
  )

  const resetForm = useCallback(() => {
    setSelectedColor('red')
    setListName('')
    setSelectedEmoji('😀')
    setListType('color')
  }, [])

  useEffect(() => {
    if (state?.success) {
      resetForm()
      setOpen(false)
      router.push('/lists')
    }
  }, [state?.success, router, resetForm])

  return (
    <Dialog
      open={open}
      onOpenChange={newOpen => {
        setOpen(newOpen)
        if (!newOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button size='sm' variant='outline' className={cn('h-9 w-9 rounded-full p-0', className)}>
          <Plus size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-lg font-medium'>Create New List</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <div className='relative'>
              <div className='absolute top-1/2 left-3 z-10 -translate-y-1/2 transform'>
                {listType === 'emoji' ? (
                  <span className='text-lg'>{selectedEmoji}</span>
                ) : (
                  <div
                    className='h-4 w-4 rounded-full'
                    style={{ backgroundColor: listColors[selectedColor] }}
                  />
                )}
              </div>
              <Input
                placeholder='Enter list name...'
                value={listName}
                onChange={e => setListName(e.target.value)}
                className={cn('h-10 pl-10', state?.errors?.title && 'border-destructive')}
                required
              />
              {state?.errors?.title && (
                <p className='text-destructive mt-1 text-xs'>{state.errors.title[0]}</p>
              )}
            </div>
          </div>

          <div>
            <Tabs value={listType} onValueChange={value => setListType(value as ListType)}>
              <TabsList className='grid h-9 w-full grid-cols-2'>
                <TabsTrigger value='color' className='flex items-center gap-1.5 text-xs'>
                  <Palette size={14} />
                  Color
                </TabsTrigger>
                <TabsTrigger value='emoji' className='flex items-center gap-1.5 text-xs'>
                  <Smile size={14} />
                  Emoji
                </TabsTrigger>
              </TabsList>

              <TabsContent value='color' className='mt-3'>
                <div className='bg-muted/30 flex flex-wrap justify-center gap-2 rounded-lg p-3'>
                  {Object.entries(listColors).map(([colorKey, colorValue]) => (
                    <ColorButton
                      key={colorKey}
                      colorKey={colorKey as ListColor}
                      colorValue={colorValue}
                      isSelected={selectedColor === colorKey}
                      onClick={color => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='emoji' className='mt-3'>
                <div className='bg-muted/30 flex justify-center rounded-lg p-3'>
                  <EmojiPicker onEmojiSelect={setSelectedEmoji} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className='bg-muted/30 flex items-center gap-2 rounded-lg p-3'>
            <span className='text-muted-foreground text-xs'>Preview:</span>
            <div className='flex items-center gap-2'>
              {listType === 'emoji' ? (
                <span className='text-sm'>{selectedEmoji}</span>
              ) : (
                <div
                  className='h-3 w-3 rounded-full'
                  style={{ backgroundColor: listColors[selectedColor] }}
                />
              )}
              <span className='truncate text-sm font-medium'>{listName || 'Your list name'}</span>
            </div>
          </div>

          {state?.message && !state?.success && (
            <div className='bg-destructive/10 border-destructive/20 rounded border p-2'>
              <p className='text-destructive text-xs'>{state.message}</p>
            </div>
          )}

          <div className='flex gap-2 pt-2'>
            <Button
              type='button'
              variant='outline'
              className='h-9 flex-1'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='h-9 flex-1'
              disabled={isPending || isTransitionPending || !listName.trim()}
            >
              {isPending || isTransitionPending ? (
                <>
                  <div className='mr-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent' />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className='mr-2 h-3 w-3' />
                  Create List
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
