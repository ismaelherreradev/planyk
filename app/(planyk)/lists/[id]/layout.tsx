import { ListProvider } from '@/contexts/list-context'
import { getListById, getLists } from '@/db/query'

import DeleteList from '@/components/task/delete-lits'

export default async function ListLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [currentList, allLists] = await Promise.all([getListById(Number(id)), getLists()])

  if (!currentList) {
    return (
      <div className='container mx-auto max-w-7xl px-4 py-8'>
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <div className='bg-muted/30 mb-4 rounded-xl p-3'>
            <div className='text-muted-foreground h-8 w-8' aria-hidden='true'>
              📋
            </div>
          </div>
          <h1 className='mb-2 text-lg font-medium'>List not found</h1>
          <p className='text-muted-foreground max-w-xs text-sm text-balance'>
            The list you&apos;re looking for doesn&apos;t exist or may have been deleted.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ListProvider currentList={currentList ?? undefined} allLists={allLists ?? []}>
      <div className='min-h-screen'>
        <div className='container mx-auto max-w-7xl px-4 py-6'>
          <header className='mb-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                {currentList.listType === 'emoji' ? (
                  <div className='bg-muted/20 flex h-10 w-10 items-center justify-center rounded-lg'>
                    <span className='text-base' aria-hidden='true'>
                      {currentList.emoji.startsWith('http') ? '📝' : currentList.emoji}
                    </span>
                  </div>
                ) : (
                  <div
                    className='flex h-10 w-10 items-center justify-center rounded-lg'
                    style={{ backgroundColor: currentList.color + '15' }}
                  >
                    <div
                      className='h-4 w-4 rounded-full'
                      style={{ backgroundColor: currentList.color }}
                      aria-hidden='true'
                    />
                  </div>
                )}
                <div>
                  <h1 className='text-2xl font-bold tracking-tight'>{currentList.title}</h1>
                </div>
              </div>
              <DeleteList id={Number(id)} />
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </ListProvider>
  )
}
