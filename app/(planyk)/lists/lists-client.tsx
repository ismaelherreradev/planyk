"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Paths } from "@/config/site";
import { Plus, Search } from "lucide-react";

import CreateList from "../_components/create-list";

interface List {
  id: number;
  title: string;
  color: string;
  emoji: string;
  listType: "color" | "emoji";
}

interface Task {
  id: number;
  status: "pending" | "finished" | "deleted";
}

interface ListWithTasks {
  id: number;
  title: string;
  color: string;
  emoji: string;
  listType: "color" | "emoji";
  tasks: Task[];
}

function ListsGrid({ lists, searchQuery }: { lists: ListWithTasks[]; searchQuery: string }) {
  const filteredLists = useMemo(() => {
    if (!searchQuery.trim()) return lists;
    return lists.filter((list) => list.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [lists, searchQuery]);

  if (!lists || lists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="p-4 rounded-2xl bg-muted/50 mb-4">
          <Plus className="h-12 w-12 text-muted-foreground mx-auto" />
        </div>
        <h2 className="text-lg font-medium mb-2">Create your first list</h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          Start organizing your tasks by creating your first list
        </p>
        <CreateList />
      </div>
    );
  }

  if (filteredLists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="p-4 rounded-2xl bg-muted/50 mb-4">
          <Search className="h-12 w-12 text-muted-foreground mx-auto" />
        </div>
        <h2 className="text-lg font-medium mb-2">No lists found</h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          Try adjusting your search terms
        </p>
      </div>
    );
  }

  return (
    <>
      {filteredLists.map((listWithTasks) => {
        const list = listWithTasks;
        const tasks = listWithTasks.tasks;
        const activeTasks = tasks.filter((task) => task.status !== "deleted");
        const finishedTasks = activeTasks.filter((task) => task.status === "finished");

        return (
          <Link key={list.id} href={`${Paths.ListsPage}/${list.id}`}>
            <Card className="group transition-all duration-200 hover:shadow-sm cursor-pointer border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 h-full">
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  {list.listType === "emoji" ? (
                    <div className="p-1.5 rounded-lg bg-muted/30 flex-shrink-0">
                      <span className="text-base">
                        {list.emoji.startsWith("http") ? "😀" : list.emoji}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="p-1.5 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: list.color + "20" }}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: list.color }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">{list.title}</h3>
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5 rounded-md">
                        {activeTasks.length}
                      </Badge>
                    </div>
                    {finishedTasks.length > 0 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-1.5 py-0.5 rounded-md border-green-200 text-green-700 bg-green-50 dark:border-green-800 dark:text-green-300 dark:bg-green-950"
                      >
                        {finishedTasks.length} done
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  {activeTasks.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span className="font-medium">
                          {Math.round((finishedTasks.length / activeTasks.length) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted/40 rounded-full h-1 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(finishedTasks.length / activeTasks.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-xs text-muted-foreground">No tasks yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </>
  );
}

export default function PlanykPage({ lists }: { lists: ListWithTasks[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Lists</h1>
          <CreateList />
        </div>
        <div className="flex items-center gap-4 mb-2">
          <p className="text-muted-foreground text-sm">
            Organize and manage your tasks efficiently
          </p>
          <div className="relative flex-1 max-w-sm ml-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-muted/30 border-0 focus:bg-background transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <ListsGrid lists={lists} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
