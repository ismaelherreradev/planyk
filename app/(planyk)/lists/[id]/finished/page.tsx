import { Suspense } from 'react'
import { getTasksByListIdAndStatus } from '@/db/query'

import TasksContainer from '@/components/task/task-container'
import TaskSkeleton from '@/components/task/task-skeleton'

export default async function FinishedTasks({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tasks = await getTasksByListIdAndStatus(Number(id), 'finished')

  return (
    <>
      <Suspense fallback={<TaskSkeleton />}>
        <TasksContainer tasks={tasks!} />
      </Suspense>
    </>
  )
}
