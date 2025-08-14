import { Suspense } from "react";
import { getTasksByListId } from "@/db/query";

import TasksContainer from "./_components/task-container";
import TaskSkeleton from "./_components/task-skeleton";

export default async function ListIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tasks = await getTasksByListId(Number(id));

  return (
    <>
      <Suspense fallback={<TaskSkeleton />}>
        <TasksContainer tasks={tasks!} />
      </Suspense>
    </>
  );
}
