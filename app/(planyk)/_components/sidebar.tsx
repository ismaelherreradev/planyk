import Link from "next/link";
import { SiteConfig } from "@/config/site";
import { ListsWithTasks } from "@/types";

import CreateList from "./create-list";
import Nav from "./nav";

type ListsProps = {
  lists: ListsWithTasks[];
};

export default function SideBar({ lists }: ListsProps) {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex text-2xl items-center gap-2 font-semibold">
            <span className="">{SiteConfig.title}</span>
          </Link>
        </div>
        <div className="flex-1">
          <Nav lists={lists} />
        </div>
        <div className="mt-auto p-4">
          <CreateList />
        </div>
      </div>
    </div>
  );
}
