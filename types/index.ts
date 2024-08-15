import type { SelectList, SelectTask } from "@/db/schema";

export type ListsWithTasks = {
  list: SelectList;
  tasks: SelectTask[];
};
