import type { SelectList, SelectTask } from "@/db/schema";

export type ListsWithTasks = {
  list: SelectList;
  tasks: SelectTask[];
};

export type CreateTaskFormProps = {
  lists: ListsWithTasks[];
};

export type ListItemProps = {
  list: ListsWithTasks["list"];
  tasks: ListsWithTasks["tasks"];
};
