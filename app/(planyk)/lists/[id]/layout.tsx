import Navbar from "../../_components/navbar";
import TaskActions from "./_components/task-actions";

export default async function ListLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  return (
    <main className="flex flex-1 flex-col">
      <Navbar />
      <TaskActions id={params.id} />
      {children}
    </main>
  );
}
