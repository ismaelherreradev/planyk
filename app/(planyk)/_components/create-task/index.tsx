"use client";

import CreateTaskDialog from "./create-task-dialog";

interface CreateTaskProps {
  variant?: "button" | "inline";
  className?: string;
}

export default function CreateTask({ variant = "button", className }: CreateTaskProps) {
  return <CreateTaskDialog variant={variant} className={className} />;
}
