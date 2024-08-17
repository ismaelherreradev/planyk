import Image from "next/image";
import { SelectItem } from "@/components/ui/select";
import type { SelectList } from "@/db/schema";
import { cn } from "@/lib/utils";

import { ListColor, listColors } from "../create-list/color-button";

type ListItemProps = {
  list: SelectList;
};

export default function ListItem({ list }: ListItemProps) {
  return (
    <SelectItem key={list.id} value={list.id.toString()}>
      <div className="flex items-center space-x-2">
        {list.listType === "color" ? (
          <div
            className={cn(
              "h-5 w-5 rounded-full border-2 border-gray-500/50",
              listColors[list.color as ListColor],
            )}
          />
        ) : (
          <Image src={list.emoji} width={20} height={20} priority alt={list.title} />
        )}
        <span>{list.title}</span>
      </div>
    </SelectItem>
  );
}
