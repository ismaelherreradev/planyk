import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Paths } from "@/config/site";
import { ListsWithTasks } from "@/types";

type ListsProps = {
  lists: ListsWithTasks[];
};

export default function Nav({ lists }: ListsProps) {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {lists?.map(({ list, tasks }) => (
        <Link
          key={list.id}
          href={`${Paths.ListsPage}/${list.id}`}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          {list.title}
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            {tasks.length ?? 0}
          </Badge>
        </Link>
      ))}
    </nav>
  );
}
