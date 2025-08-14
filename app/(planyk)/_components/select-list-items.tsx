import { memo } from 'react'
import Image from 'next/image'
import { type ListItemProps } from '@/types'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { SelectItem } from '@/components/ui/select'

import { listColors, type ListColor } from './create-list/color-button'

function ListItem({ list, tasks }: ListItemProps) {
  return (
    <SelectItem value={String(list.id)}>
      <div className='flex items-center space-x-2'>
        {list.listType === 'color' ? (
          <div
            className={cn(
              'h-5 w-5 rounded-full border-2 border-gray-500/50',
              listColors[list.color as ListColor]
            )}
          />
        ) : (
          <Image src={list.emoji} width={20} height={20} priority alt={list.title} />
        )}
        <div className='flex w-[100px] items-center justify-between md:w-[200px]'>
          <span className='truncate'>{list.title}</span>
          <Badge className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
            {tasks.length ?? 0}
          </Badge>
        </div>
      </div>
    </SelectItem>
  )
}

export const MemoizedListItem = memo(ListItem)
