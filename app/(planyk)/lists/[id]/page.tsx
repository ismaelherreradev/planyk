import { db } from "@/db";

import TasksContainer from "./_components/task-container";

export default async function ListIdPage({ params }: { params: { id: number } }) {
  const tasks = await db.query.tasks.findMany({
    where: (tasks, { eq, and }) => and(eq(tasks.listId, params.id), eq(tasks.status, "noted")),
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <TasksContainer tasks={tasks} />
    </main>
  );
}
