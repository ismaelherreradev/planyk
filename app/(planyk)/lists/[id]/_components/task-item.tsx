"use client";

import { updateStateTask } from "@/app/(planyk)/_actions";
import { Checkbox } from "@/components/ui/checkbox";
import { statusEnum, type SelectTask } from "@/db/schema";
import { formatDateToLocal } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClockIcon } from "lucide-react";
import { useServerAction } from "zsa-react";

export default function TaskItem({ task }: { task: SelectTask }) {
  const { isPending, execute } = useServerAction(updateStateTask);

  return (
    <AnimatePresence>
      {!isPending && (
        <motion.li
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex items-center rounded-xl bg-muted/50 py-3 px-4"
        >
          <Checkbox
            checked={task.status === statusEnum.FINISHED}
            onCheckedChange={async (checked) => {
              if (checked) {
                execute({
                  id: task.id,
                  status: statusEnum.FINISHED,
                });
              } else {
                execute({
                  id: task.id,
                  status: statusEnum.PENDING,
                });
              }
            }}
            className="mr-2"
          />
          <span>{task.title}</span>
          <div className="ml-auto flex items-center space-x-2 text-xs bg-muted/50 rounded-lg py-2 px-3">
            <CalendarClockIcon size={14} />
            <span>{formatDateToLocal(task.dateTime)}</span>
          </div>
        </motion.li>
      )}
    </AnimatePresence>
  );
}
