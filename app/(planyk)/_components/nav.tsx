import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Paths } from "@/config/site";
import { cn } from "@/lib/utils";
import { ListsWithTasks } from "@/types";

import { listColors, type ListColor } from "./create-list/color-button";

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
          {list.listType === "color" ? (
            <div
              className={cn(
                "h-5 w-5  rounded-full border-2 border-gray-500/50 ",
                listColors[list.color as ListColor],
              )}
            />
          ) : (
            <Image src={list.emoji} width={20} height={20} priority alt={list.title} />
          )}
          {list.title}
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            {tasks.length ?? 0}
          </Badge>
        </Link>
      ))}
    </nav>
  );
}
