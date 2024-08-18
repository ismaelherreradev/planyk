import { getTaskById } from "@/db/query";

import TasksContainer from "./_components/task-container";

export default async function ListIdPage({ params }: { params: { id: number } }) {
  const tasks = await getTaskById(params.id);

  return (
    <>
      <TasksContainer tasks={tasks!} />
    </>
  );
}
