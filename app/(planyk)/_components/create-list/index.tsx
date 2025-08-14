"use client";

import CreateListDialog from "./create-list-dialog";

interface CreateListProps {
  className?: string;
}

export default function CreateList({ className }: CreateListProps) {
  return <CreateListDialog className={className} />;
}
