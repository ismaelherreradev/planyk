import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { getListsWithAllTasks } from "@/db/query";
import { currentUser } from "@clerk/nextjs/server";

import PlanykPage from "./lists-client";

async function ListsPageWrapper() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const lists = await getListsWithAllTasks();

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="h-8 w-16 bg-muted rounded animate-pulse" />
              <div className="h-9 w-24 bg-muted rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-4 w-64 bg-muted rounded animate-pulse" />
              <div className="relative flex-1 max-w-sm ml-auto">
                <div className="h-9 w-full bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse border-0 bg-card/50 h-full">
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 bg-muted rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-20 bg-muted rounded" />
                        <div className="h-4 w-6 bg-muted rounded" />
                      </div>
                      <div className="h-2 w-12 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="h-2 w-12 bg-muted rounded" />
                        <div className="h-2 w-6 bg-muted rounded" />
                      </div>
                      <div className="h-1 w-full bg-muted rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      }
    >
      <PlanykPage lists={lists || []} />
    </Suspense>
  );
}

export default ListsPageWrapper;
