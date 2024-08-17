import { db } from "@/db";

import CreateTaskForm from "./create-task-form";

export default async function CreateTask() {
  const lists = await db.query.lists.findMany();

  return (
    <div className="flex justify-center">
      <CreateTaskForm lists={lists} />
    </div>
  );
}
