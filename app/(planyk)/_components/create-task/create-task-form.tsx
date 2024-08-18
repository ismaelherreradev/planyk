"use client";

import { useRef, useState, type ElementRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SelectList } from "@/db/schema";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { useServerAction } from "zsa-react";

import { createTask } from "../../_actions";
import ListItem from "./list-item";

type CreateTaskFormProps = {
  lists: SelectList[];
};

export default function CreateTaskForm({ lists }: CreateTaskFormProps) {
  const { isPending, execute, isError, error } = useServerAction(createTask);
  const closeRef = useRef<ElementRef<"button">>(null);

  const [formState, setFormState] = useState<{
    date: Date;
    title: string;
    selectedList: string;
  }>({
    date: new Date(),
    title: "",
    selectedList: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleDateChange(date: Date | undefined) {
    if (date) {
      setFormState({ ...formState, date });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await execute({
      listId: formState.selectedList,
      title: formState.title,
      dateTime: formState.date,
    });

    if (isError) {
      return;
    }

    setFormState({ date: new Date(), title: "", selectedList: "" });
    closeRef.current?.click();
  }

  return (
    <Popover>
      <PopoverTrigger ref={closeRef} asChild>
        <Button size={"sm"} className="rounded-xl border-none">
          <Plus size={14} className="mr-1" /> Add new task
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
          <div className="w-full">
            <Input
              id="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              placeholder="Create new task"
              className={cn(error?.fieldErrors?.title && "border-red-500")}
            />
            {isError && <span className="text-red-500 text-xs">{error.fieldErrors?.title}</span>}
          </div>
          <div className="w-full">
            <Select onValueChange={(value) => setFormState({ ...formState, selectedList: value })}>
              <SelectTrigger>
                <SelectValue placeholder="No lists" />
              </SelectTrigger>
              <SelectContent>
                {lists.map((list) => (
                  <ListItem key={list.id} list={list} />
                ))}
              </SelectContent>
            </Select>
            {isError && <span className="text-red-500 text-xs">{error.fieldErrors?.listId}</span>}
          </div>
          <Calendar mode="single" selected={formState.date} onSelect={handleDateChange} />
          <Button size={"sm"} type="submit" className="w-full">
            {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Create"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
