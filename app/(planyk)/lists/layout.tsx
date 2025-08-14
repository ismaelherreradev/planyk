import { ListProvider } from '@/contexts/list-context'
import { getLists, getListsWithTasks } from '@/db/query'

import Navbar from '@/components/planyk/navbar'

export default async function ListLayout({ children }: { children: React.ReactNode }) {
  const [fetchedLists, allLists] = await Promise.all([getListsWithTasks(), getLists()])

  const lists = fetchedLists?.map(({ tasks, ...list }) => ({
    list,
    tasks,
  }))

  return (
    <ListProvider allLists={allLists ?? []}>
      <div className='from-background to-muted/20 min-h-screen bg-gradient-to-br'>
        <Navbar lists={lists!} />
        <main>{children}</main>
      </div>
    </ListProvider>
  )
}
