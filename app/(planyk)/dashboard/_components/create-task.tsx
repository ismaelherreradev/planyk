"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectList } from "@/db/schema";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { useServerAction } from "zsa-react";

import { createTask } from "../_actions";

export default function CreateTask({ lists }: { lists: SelectList[] }) {
  const { isPending, execute, isSuccess, data, isError, error } = useServerAction(createTask);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [title, setTitle] = useState("");

  const [selectedlist, setSelectedlist] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"lg"} className="rounded-3xl border-none">
          <Plus size={14} className="mr-1" /> Cleate a new task
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            await execute({ listId: selectedlist, title, dateTime: date as Date });

            setTitle("");
            setSelectedlist("");
          }}
          className="flex-col flex space-y-4  items-center"
        >
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Create new task"
          />
          <Select onValueChange={setSelectedlist}>
            <SelectTrigger>
              <SelectValue placeholder="No lists" />
            </SelectTrigger>
            <SelectContent>
              {lists.map((list) => (
                <SelectItem key={list.id} value={list.id.toString()}>
                  {list.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Calendar mode="single" selected={date} onSelect={setDate} />
          <Button size={"sm"} type="submit" className="w-full">
            {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Create"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
