import { getListsWithTasks } from "@/db/query";

import Navbar from "../_components/navbar";

export default async function ListLayout({ children }: { children: React.ReactNode }) {
  const fetchedLists = await getListsWithTasks();

  const lists = fetchedLists?.map(({ tasks, ...list }) => ({
    list,
    tasks,
  }));

  return (
    <main className="min-h-svh container">
      <Navbar lists={lists!} />

      {children}
    </main>
  );
}
