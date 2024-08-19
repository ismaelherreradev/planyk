import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ListsWithTasks } from "@/types";

import CreateList from "./create-list";
import { listColors, type ListColor } from "./create-list/color-button";
import { UserClerkButton } from "./navbar-items";

type CreateTaskFormProps = {
  lists: ListsWithTasks[];
};

type ListItemProps = {
  list: ListsWithTasks["list"];
  tasks: ListsWithTasks["tasks"];
};

function ListItem({ list, tasks }: ListItemProps) {
  return (
    <SelectItem key={list.id} value={String(list.id)}>
      <div className="flex items-center space-x-2">
        {list.listType === "color" ? (
          <div
            className={cn(
              "h-5 w-5 rounded-full border-2 border-gray-500/50",
              listColors[list.color as ListColor],
            )}
          />
        ) : (
          <Image src={list.emoji} width={20} height={20} priority alt={list.title} />
        )}
        <div className="flex items-center justify-between w-[100px] md:w-[200px]">
          <span className="truncate">{list.title}</span>
          <div className="flex items-center">
            <Badge className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {tasks.length ?? 0}
            </Badge>
          </div>
        </div>
      </div>
    </SelectItem>
  );
}

function Navbar({ lists }: CreateTaskFormProps) {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-background">
      <nav className="flex w-full justify-between items-center">
        <div className="flex space-x-2 md:space-x-5 items-center">
          <Link href="/" className="flex text-3xl items-center gap-2 font-bold">
            <span className="">{SiteConfig.title}</span>
          </Link>

          <div className="flex space-x-1 items-center">
            <Select>
              <SelectTrigger className="rounded-3xl w-[180px] md:w-[280px]">
                <SelectValue placeholder="No lists" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lists</SelectLabel>
                  {lists.map(({ list, tasks }) => (
                    <ListItem key={list.id} list={list} tasks={tasks} />
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <CreateList />
        </div>
        <div className="flex space-x-3">
          <UserClerkButton />
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
