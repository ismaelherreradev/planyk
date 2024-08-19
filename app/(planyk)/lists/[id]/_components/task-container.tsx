import type { SelectTask } from "@/db/schema";

import TaskItem from "./task-item";

export default async function TasksContainer({ tasks }: { tasks: SelectTask[] }) {
  return (
    <ul className="space-y-2 container">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
