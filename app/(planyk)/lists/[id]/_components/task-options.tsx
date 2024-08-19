"use client";

import { updateStateTask } from "@/app/(planyk)/_actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusEnum, type Status } from "@/db/schema";
import { EllipsisVertical } from "lucide-react";
import { useServerAction } from "zsa-react";

export default function TaskOptions({ id, status }: { id: number; status: Status }) {
  const { execute } = useServerAction(updateStateTask);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="ml-2 cursor-pointer" size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          {status === statusEnum.DELETED ? (
            <Button
              className="w-full"
              variant={"secondary"}
              size="sm"
              onClick={() => {
                execute({ id, status: statusEnum.PENDING });
              }}
            >
              Restore
            </Button>
          ) : (
            <Button
              className="w-full"
              variant={"destructive"}
              size="sm"
              onClick={() => {
                execute({ id, status: statusEnum.DELETED });
              }}
            >
              Delete
            </Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
