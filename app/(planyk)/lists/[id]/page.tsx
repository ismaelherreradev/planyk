import { getTaskById } from "@/db/query";

import CreateTask from "../../_components/create-task";
import Navbar from "../../_components/navbar";
import TasksContainer from "./_components/task-container";

export default async function ListIdPage({ params }: { params: { id: number } }) {
  const tasks = await getTaskById(params.id);

  return (
    <>
      <main className="flex flex-1 flex-col">
        <Navbar />
        <TasksContainer tasks={tasks!} />

        <div className="mt-auto p-4">
          <CreateTask />
        </div>
      </main>
    </>
  );
}
