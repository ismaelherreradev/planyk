"use client";

import { memo, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SelectTask } from "@/db/schema";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Plus } from "lucide-react";

import CreateTask from "../../../_components/create-task";
import TaskItem from "./task-item";

interface TasksContainerProps {
  tasks: SelectTask[];
}

const TasksContainer = memo(function TasksContainer({ tasks }: TasksContainerProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "finished">("all");

  const { filteredTasks, stats } = useMemo(() => {
    const activeTasks = tasks.filter((task) => task.status !== "deleted");

    let filtered;
    if (filter === "all") {
      filtered = activeTasks;
    } else {
      filtered = activeTasks.filter((task) => task.status === filter);
    }

    const pendingTasks = activeTasks.filter((task) => task.status === "pending");
    const finishedTasks = activeTasks.filter((task) => task.status === "finished");

    return {
      filteredTasks: filtered,
      stats: {
        total: activeTasks.length,
        pending: pendingTasks.length,
        finished: finishedTasks.length,
      },
    };
  }, [tasks, filter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs rounded-md">
            {filteredTasks.length}
          </Badge>
        </div>
        <CreateTask />
      </div>

      <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
        <Button
          variant={filter === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
          className="h-8 px-3 text-sm rounded-md"
        >
          All ({stats.total})
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("pending")}
          className="h-8 px-3 text-sm rounded-md"
        >
          <Clock className="mr-1.5 h-3 w-3" />
          Pending ({stats.pending})
        </Button>
        <Button
          variant={filter === "finished" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("finished")}
          className="h-8 px-3 text-sm rounded-md"
        >
          <CheckCircle2 className="mr-1.5 h-3 w-3" />
          Finished ({stats.finished})
        </Button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 rounded-xl bg-muted/50 mb-4">
            <Plus className="h-8 w-8 text-muted-foreground mx-auto" />
          </div>
          <h3 className="text-base font-medium mb-2">
            {filter === "all" ? "No tasks yet" : `No ${filter} tasks`}
          </h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs">
            {filter === "all"
              ? "Create your first task to get started"
              : `No ${filter} tasks at the moment`}
          </p>
          {filter === "all" && (
            <div className="w-full max-w-md">
              <CreateTask variant="inline" />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <TaskItem task={task} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
});

export default TasksContainer;
