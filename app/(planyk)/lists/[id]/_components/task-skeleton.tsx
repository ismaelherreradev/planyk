import { Skeleton } from "@/components/ui/skeleton";

export default function TaskSkeleton() {
  return (
    <div className="space-y-2 container">
      <Skeleton className="flex  items-center h-[56px] rounded-xl bg-muted/50 py-3 px-4" />
      <Skeleton className="flex  items-center h-[56px] rounded-xl bg-muted/50 py-3 px-4" />
      <Skeleton className="flex  items-center h-[56px] rounded-xl bg-muted/50 py-3 px-4" />
      <Skeleton className="flex  items-center h-[56px] rounded-xl bg-muted/50 py-3 px-4" />
      <Skeleton className="flex  items-center h-[56px] rounded-xl bg-muted/50 py-3 px-4" />
    </div>
  );
}
