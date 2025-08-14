import Link from 'next/link'
import { FilterIcon } from 'lucide-react'
import { useServerAction } from 'zsa-react'

import { Paths } from '@/config/site'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CreateTask from '@/app/(planyk)/_components/create-task'

import DeleteList from './delete-lits'

export default function TaskActions({ id }: { id: number }) {
  return (
    <div className='my-6 flex items-center justify-end space-x-3'>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} variant='ghost'>
              <FilterIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`${Paths.ListsPage}/${id}`}>Pending</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`${Paths.ListsPage}/${id}/finished`}>Finished</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`${Paths.ListsPage}/${id}/deleted`}>Deleted</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CreateTask />
      <DeleteList id={id} />
    </div>
  )
}
