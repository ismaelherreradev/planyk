"use client";

import { useActionState, useCallback, useEffect, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus } from "lucide-react";

import { createTask } from "../../_actions";
import { useAllLists, useCurrentList } from "../../contexts/list-context";

const initialState = {
  message: "",
  errors: {},
  success: false,
};

interface CreateTaskDialogProps {
  variant?: "button" | "inline";
  className?: string;
}

export default function CreateTaskDialog({ variant = "button", className }: CreateTaskDialogProps) {
  const currentList = useCurrentList();
  const allLists = useAllLists();
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(createTask, initialState);
  const [isTransitionPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedListId, setSelectedListId] = useState(currentList?.id.toString() ?? "");

  const resetForm = useCallback(() => {
    setTitle("");
    setSelectedDate(new Date());
    setSelectedListId(currentList?.id.toString() ?? "");
  }, [currentList]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formDataObj = new FormData();
      formDataObj.append("title", title);
      formDataObj.append("dateTime", selectedDate.toISOString());
      formDataObj.append("listId", selectedListId ?? currentList?.id.toString() ?? "");

      startTransition(() => {
        formAction(formDataObj);
      });
    },
    [formAction, startTransition, title, selectedDate, selectedListId, currentList],
  );

  useEffect(() => {
    if (state?.success) {
      resetForm();
      setOpen(false);
      router.push("/lists");
    }
  }, [state?.success, router, resetForm]);

  useEffect(() => {
    if (currentList && !selectedListId) {
      setSelectedListId(currentList.id.toString());
    }
  }, [currentList, selectedListId]);

  const showListSelector = !currentList || allLists.length > 1;
  const selectedList =
    currentList ?? allLists.find((list) => list.id.toString() === selectedListId);

  const TaskForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <div>
          <Input
            placeholder={currentList ? `Add task to ${currentList.title}` : "Enter task title..."}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cn("h-10", state?.errors?.title && "border-red-500")}
            autoFocus
            required
          />
          {state?.errors?.title && (
            <p className="text-xs text-red-500 mt-1">{state.errors.title[0]}</p>
          )}
        </div>

        {showListSelector && (
          <Select value={selectedListId} onValueChange={setSelectedListId} required>
            <SelectTrigger className={cn("h-10", state?.errors?.listId && "border-red-500")}>
              <SelectValue placeholder="Choose a list..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Your Lists</SelectLabel>
                {allLists.map((list) => (
                  <SelectItem key={list.id} value={list.id.toString()}>
                    <div className="flex items-center gap-2">
                      {list.listType === "emoji" ? (
                        <span className="text-sm">{list.emoji}</span>
                      ) : (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: list.color }}
                        />
                      )}
                      <span className="truncate">{list.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-10 justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
              )}
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {selectedList && (
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded text-xs">
            <span className="text-muted-foreground">Adding to:</span>
            <Badge variant="secondary" className="text-xs">
              {selectedList.title}
            </Badge>
          </div>
        )}

        {state?.message && !state?.success && (
          <div className="p-2 rounded bg-red-50 border border-red-200">
            <p className="text-xs text-red-600">{state.message}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-2">
        {variant === "button" && (
          <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className={variant === "button" ? "flex-1" : "w-full"}
          disabled={
            isPending || isTransitionPending || !title.trim() || (!selectedListId && !currentList)
          }
          size="sm"
        >
          {isPending || isTransitionPending ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </>
          )}
        </Button>
      </div>
    </form>
  );

  if (variant === "inline") {
    return (
      <div className={cn("w-full", className)}>
        <TaskForm />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className={cn("h-9", className)}>
          <Plus size={16} className="mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {currentList ? `Add Task to ${currentList.title}` : "Create New Task"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm />
      </DialogContent>
    </Dialog>
  );
}
