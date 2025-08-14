"use client";

import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { SelectItem } from "@/components/ui/select";
import type { ListItemProps } from "@/types";

const ListItem = memo(function ListItem({ list, tasks }: ListItemProps) {
  const activeTasksCount = tasks.filter((task) => task.status !== "deleted").length;

  return (
    <SelectItem value={String(list.id)} className="cursor-pointer">
      <div className="flex items-center justify-between w-full gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {list.listType === "emoji" ? (
            <span className="text-sm shrink-0">
              {list.emoji.startsWith("http") ? "😀" : list.emoji}
            </span>
          ) : (
            <div
              className="h-4 w-4 rounded-full border shrink-0"
              style={{ backgroundColor: list.color }}
            />
          )}
          <span className="truncate font-medium text-sm">{list.title}</span>
        </div>

        <Badge variant="secondary" className="h-5 px-2 text-xs shrink-0">
          {activeTasksCount}
        </Badge>
      </div>
    </SelectItem>
  );
});

export const MemoizedListItem = ListItem;
