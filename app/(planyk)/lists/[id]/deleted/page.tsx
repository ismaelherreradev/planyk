import { Suspense } from "react";
import { getTaskById } from "@/db/query";

import TasksContainer from "../_components/task-container";
import TaskSkeleton from "../_components/task-skeleton";

export default async function DeletedTasks({ params }: { params: { id: number } }) {
  const tasks = await getTaskById(params.id, "deleted");

  return (
    <>
      <Suspense fallback={<TaskSkeleton />}>
        <TasksContainer tasks={tasks!} />
      </Suspense>
    </>
  );
}
