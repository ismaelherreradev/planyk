import type { SelectList, SelectTask } from '@/db/schema'

export interface ListsWithTasks {
  list: SelectList
  tasks: SelectTask[]
}

export interface CreateTaskFormProps {
  lists: ListsWithTasks[]
}

export interface ListItemProps {
  list: ListsWithTasks['list']
  tasks: ListsWithTasks['tasks']
}
