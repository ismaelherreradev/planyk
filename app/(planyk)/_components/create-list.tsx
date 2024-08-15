"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Plus } from "lucide-react";
import { useServerAction } from "zsa-react";

import { createList } from "../_actions";

export default function CreateList() {
  const { isPending, executeFormAction, isSuccess, data, isError, error } =
    useServerAction(createList);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"} className="rounded-3xl w-full border-none">
          <Plus size={14} className="mr-3 inle" /> Cleate a new list
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a list</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>Create a list</DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>

        <form action={executeFormAction} className="space-y-4">
          <Input id="title" name="title" type="text" placeholder="Add title.." />
          <Button size={"sm"} type="submit">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
