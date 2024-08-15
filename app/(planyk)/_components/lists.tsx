import { db } from "@/db";

import CreateTask from "./create-task";

export default async function Lists() {
  const lists = await db.query.lists.findMany();

  return (
    <div className="flex justify-center">
      <CreateTask lists={lists} />
    </div>
  );
}
