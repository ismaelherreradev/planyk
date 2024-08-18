import { getTaskById } from "@/db/query";

import TasksContainer from "../_components/task-container";

export default async function FinishedTasks({ params }: { params: { id: number } }) {
  const tasks = await getTaskById(params.id, "finished");

  return (
    <>
      <TasksContainer tasks={tasks!} />
    </>
  );
}
