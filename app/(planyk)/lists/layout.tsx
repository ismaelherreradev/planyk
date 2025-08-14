import { getLists, getListsWithTasks } from "@/db/query";

import Navbar from "../_components/navbar";
import { ListProvider } from "../contexts/list-context";

export default async function ListLayout({ children }: { children: React.ReactNode }) {
  const [fetchedLists, allLists] = await Promise.all([getListsWithTasks(), getLists()]);

  const lists = fetchedLists?.map(({ tasks, ...list }) => ({
    list,
    tasks,
  }));

  return (
    <ListProvider allLists={allLists ?? []}>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Navbar lists={lists!} />
        <main>{children}</main>
      </div>
    </ListProvider>
  );
}
