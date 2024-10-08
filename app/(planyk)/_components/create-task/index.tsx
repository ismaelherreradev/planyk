import { getLists } from "@/db/query";

import CreateTaskForm from "./create-task-form";

export default async function CreateTask() {
  const lists = await getLists();

  return <CreateTaskForm lists={lists!} />;
}
