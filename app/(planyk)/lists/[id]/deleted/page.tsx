import { getTaskById } from "@/db/query";

import TasksContainer from "../_components/task-container";

export default async function DeletedTasks({ params }: { params: { id: number } }) {
  const tasks = await getTaskById(params.id, "deleted");

  return (
    <>
      <TasksContainer tasks={tasks!} />
    </>
  );
}
