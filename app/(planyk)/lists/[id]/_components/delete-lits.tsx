"use client";

import { deleteList } from "@/app/(planyk)/_actions";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { useServerAction } from "zsa-react";

export default function DeleteList({ id }: { id: number }) {
  const { execute, isPending } = useServerAction(deleteList);
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {isPending ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Button
              size={"icon"}
              className="h-9"
              variant="destructive"
              onClick={async () => {
                await execute(Number(id));
              }}
            >
              <TrashIcon />
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent side={"bottom"}>
          <p>Delete list</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
