import { db } from "@/db";
import { tasks } from "@/db/schema";

export default async function ListIdPage({ params }: { params: { id: number } }) {
  const tasks = await db.query.tasks.findMany({
    where: (tasks, { eq }) => eq(tasks.listId, params.id),
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </main>
  );
}
