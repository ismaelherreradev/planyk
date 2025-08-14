"use client";

import { memo, useState, useTransition } from "react";
import { updateTaskStatus } from "@/app/(planyk)/_actions";
import { Checkbox } from "@/components/ui/checkbox";
import { statusEnum, type SelectTask } from "@/db/schema";
import { cn, formatDateToLocal } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import TaskOptions from "./task-options";

const TaskItem = memo(function TaskItem({ task }: { task: SelectTask }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useState(task.status);

  const handleStatusChange = (checked: boolean) => {
    const newStatus = checked ? statusEnum.FINISHED : statusEnum.PENDING;
    setOptimisticStatus(newStatus);

    startTransition(async () => {
      try {
        await updateTaskStatus(task.id, newStatus);
      } catch (error) {
        setOptimisticStatus(task.status);
      }
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl bg-background border-0 shadow-sm hover:shadow-md transition-all duration-200",
        optimisticStatus === statusEnum.FINISHED && "opacity-70",
        optimisticStatus === statusEnum.DELETED && "opacity-50",
        isPending && "animate-pulse",
      )}
    >
      <Checkbox
        checked={optimisticStatus === statusEnum.FINISHED}
        onCheckedChange={handleStatusChange}
        disabled={isPending || optimisticStatus === statusEnum.DELETED}
        className="h-3 w-3"
      />

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-medium mb-1",
            optimisticStatus === statusEnum.FINISHED && "line-through text-muted-foreground",
            optimisticStatus === statusEnum.DELETED && "line-through text-muted-foreground",
          )}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarIcon className="h-3 w-3" />
          <span>{formatDateToLocal(task.dateTime)}</span>
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <TaskOptions id={task.id} status={optimisticStatus} />
      </div>
    </div>
  );
});

export default TaskItem;
