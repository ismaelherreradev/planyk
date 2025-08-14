import { forwardRef, type Ref } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import CreateListDialog from "./create-list-dialog";

const CreateListButton = forwardRef((props, _ref: Ref<HTMLButtonElement>) => {
  return <CreateListDialog {...props} />;
});

CreateListButton.displayName = "CreateListButton";

function CreateListTooltip() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <CreateListButton />
        </TooltipTrigger>
        <TooltipContent
          className="mr-7 rounded-xl"
          side={"bottom"}
          align={"center"}
          alignOffset={100}
          avoidCollisions={false}
        >
          <p>Create a new list</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { CreateListButton, CreateListTooltip as CreateListButtonWithTooltip };
