import { forwardRef, Ref } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import CreateListForm from ".";

const CreateListButton = forwardRef((props, ref: Ref<HTMLButtonElement>) => {
  return (
    <button ref={ref} {...props}>
      <CreateListForm />
    </button>
  );
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
          className="mr-7 rounded-3xl"
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
