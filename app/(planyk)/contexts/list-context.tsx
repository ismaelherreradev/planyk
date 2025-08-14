"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SelectList } from "@/db/schema";

interface ListContextValue {
  currentList?: SelectList;
  allLists: SelectList[];
}

const ListContext = createContext<ListContextValue | null>(null);

export function useListContext() {
  const context = useContext(ListContext);
  return context ?? { allLists: [], currentList: undefined };
}

export function useCurrentList() {
  const context = useListContext();
  return context.currentList;
}

export function useAllLists() {
  const context = useListContext();
  return context.allLists;
}

interface ListProviderProps {
  children: ReactNode;
  currentList?: SelectList;
  allLists: SelectList[];
}

export function ListProvider({ children, currentList, allLists }: ListProviderProps) {
  return <ListContext.Provider value={{ currentList, allLists }}>{children}</ListContext.Provider>;
}
