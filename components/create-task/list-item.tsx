import type { SelectList } from '@/db/schema'

import { SelectItem } from '@/components/ui/select'
import { listColors, type ListColor } from '@/components/create-list/color-button'

interface ListItemProps {
  list: SelectList
}

export default function ListItem({ list }: ListItemProps) {
  return (
    <SelectItem key={list.id} value={String(list.id)}>
      <div className='flex items-center space-x-2'>
        {list.listType === 'color' ? (
          <div
            className='h-5 w-5 rounded-full border-2 border-gray-500/50'
            style={{ backgroundColor: listColors[list.color as ListColor] }}
          />
        ) : (
          <span className='text-sm'>{list.emoji.startsWith('http') ? '😀' : list.emoji}</span>
        )}
        <span>{list.title}</span>
      </div>
    </SelectItem>
  )
}
