import { Skeleton } from '@/components/ui/skeleton'

export default function TaskSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-7 w-16' />
          <Skeleton className='h-5 w-8 rounded-full' />
        </div>
        <Skeleton className='h-9 w-20 rounded-lg' />
      </div>

      <div className='bg-muted/30 border-border/60 flex items-center gap-1 rounded-lg border p-1'>
        <Skeleton className='h-7 w-16 rounded-md' />
        <Skeleton className='h-7 w-24 rounded-md' />
        <Skeleton className='h-7 w-24 rounded-md' />
      </div>

      <div className='space-y-2'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='bg-card/60 border-border/60 flex items-center gap-3 rounded-xl border p-3'
          >
            <Skeleton className='h-4 w-4 flex-shrink-0 rounded-sm' />
            <div className='min-w-0 flex-1 space-y-1'>
              <Skeleton className='h-4 w-full max-w-48' />
              <Skeleton className='h-3 w-24' />
            </div>
            <Skeleton className='h-7 w-7 flex-shrink-0 rounded-md' />
          </div>
        ))}
      </div>
    </div>
  )
}
