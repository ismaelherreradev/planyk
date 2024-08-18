import { getListsWithTasks } from "@/db/query";

import SideBar from "./_components/sidebar";

export default async function PlanykLayout({ children }: { children: React.ReactNode }) {
  const fetchedLists = await getListsWithTasks();

  const lists = fetchedLists?.map(({ tasks, ...list }) => ({
    list,
    tasks,
  }));

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar lists={lists!} />
      {children}
    </div>
  );
}
