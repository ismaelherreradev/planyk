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
        <div className='flex flex-col items-center justify-center py-16 text-center'>
          <h1 className='mb-1 text-lg font-medium'>List not found</h1>
          <p className='text-muted-foreground text-sm'>
            The list you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ListProvider currentList={currentList ?? undefined} allLists={allLists ?? []}>
      <div className='from-background to-muted/10 min-h-screen bg-gradient-to-br'>
        <div className='container mx-auto max-w-7xl px-4 py-6'>
          <header className='mb-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                {currentList.listType === 'emoji' ? (
                  <div className='bg-muted/50 rounded-lg p-2'>
                    <span className='text-lg'>
                      {currentList.emoji.startsWith('http') ? '😀' : currentList.emoji}
                    </span>
                  </div>
                ) : (
                  <div
                    className='rounded-lg p-2'
                    style={{ backgroundColor: currentList.color + '15' }}
                  >
                    <div
                      className='h-6 w-6 rounded-full'
                      style={{ backgroundColor: currentList.color }}
                    />
                  </div>
                )}
                <div>
                  <h1 className='text-xl font-semibold tracking-tight'>{currentList.title}</h1>
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
