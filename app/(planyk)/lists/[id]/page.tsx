import { db } from "@/db";

import CreateTask from "../../_components/create-task";
import Navbar from "../../_components/navbar";
import TasksContainer from "./_components/task-container";

export default async function ListIdPage({ params }: { params: { id: number } }) {
  const tasks = await db.query.tasks.findMany({
    where: (tasks, { eq, and }) => and(eq(tasks.listId, params.id), eq(tasks.status, "noted")),
  });

  const lists = await db.query.lists.findMany();

  return (
    <>
      <main className="flex flex-1 flex-col">
        <Navbar />
        <TasksContainer tasks={tasks} />

        <div className="mt-auto p-4">
          <CreateTask />
        </div>
      </main>
    </>
  );
}
