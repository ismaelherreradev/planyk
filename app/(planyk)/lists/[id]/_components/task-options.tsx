"use client";

import { useTransition } from "react";
import { updateTaskStatus } from "@/app/(planyk)/_actions";
import { Button } from "@/components/ui/button";
import { statusEnum, type Status } from "@/db/schema";
import { RotateCcw, Trash2 } from "lucide-react";

export default function TaskOptions({ id, status }: { id: number; status: Status }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: Status) => {
    startTransition(async () => {
      try {
        await updateTaskStatus(id, newStatus);
      } catch (error) {}
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
      disabled={isPending}
      onClick={() =>
        handleStatusChange(status === statusEnum.DELETED ? statusEnum.PENDING : statusEnum.DELETED)
      }
    >
      {status === statusEnum.DELETED ? (
        <RotateCcw className="h-4 w-4" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
