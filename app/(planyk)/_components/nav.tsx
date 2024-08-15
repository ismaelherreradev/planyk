import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";

export default async function Nav() {
  const lists = await db.query.lists.findMany({
    with: { tasks: true },
  });
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {lists.map((list) => (
        <Link
          key={list.id}
          href={`/list/${list.id}`}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          {list.title}
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            {list.tasks.length}
          </Badge>
        </Link>
      ))}
    </nav>
  );
}
