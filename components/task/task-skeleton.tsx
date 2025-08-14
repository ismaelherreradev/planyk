import { Skeleton } from '@/components/ui/skeleton'

export default function TaskSkeleton() {
  return (
    <div className='container space-y-2'>
      <Skeleton className='bg-muted/50 flex h-[56px] items-center rounded-xl px-4 py-3' />
      <Skeleton className='bg-muted/50 flex h-[56px] items-center rounded-xl px-4 py-3' />
      <Skeleton className='bg-muted/50 flex h-[56px] items-center rounded-xl px-4 py-3' />
      <Skeleton className='bg-muted/50 flex h-[56px] items-center rounded-xl px-4 py-3' />
      <Skeleton className='bg-muted/50 flex h-[56px] items-center rounded-xl px-4 py-3' />
    </div>
  )
}
