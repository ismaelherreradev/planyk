"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListType } from "@/db/schema";
import { cn } from "@/lib/utils";
import type { EmojiClickData } from "emoji-picker-react";
import { Plus } from "lucide-react";
import { useServerAction } from "zsa-react";

import { createList } from "../../_actions";
import { ColorButton, listColors, type ListColor } from "./color-button";
import { EmojiPicker } from "./emoji-picker";

export default function CreateListForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ListColor>("red");
  const [listName, setListName] = useState("");
  const [emoji, setEmoji] = useState(
    "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f603.png",
  );
  const [listType, setListType] = useState<ListType>("color");

  const { isPending, execute } = useServerAction(createList);

  const handleColorClick = (color: ListColor) => setSelectedColor(color);
  const handleEmojiClick = (emoji: EmojiClickData) => setEmoji(emoji.imageUrl);

  const colorButtons = Object.entries(listColors).map(([colorKey, colorValue]) => (
    <ColorButton
      key={colorKey}
      colorKey={colorKey as ListColor}
      colorValue={colorValue}
      isSelected={selectedColor === colorKey}
      onClick={handleColorClick}
    />
  ));

  function resetForm() {
    setSelectedColor("red");
    setListName("");
    setEmoji("1f60a");
    setListType("color");
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="lg" className="rounded-3xl w-full border-none">
          <Plus size={14} className="mr-1" /> Create a new list
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-[300px] p-3 mb-16">
        <div className="space-y-4">
          <div className="relative w-full">
            {listType === "emoji" ? (
              <div className="absolute left-0 top-0 m-2.5">
                <Image src={emoji} width={20} height={20} priority alt={listName} />
              </div>
            ) : (
              <div
                className={cn(
                  "h-5 w-5 m-2.5 rounded-full border-2 border-gray-500/50 absolute left-0 top-0",
                  listType === "color" ? listColors[selectedColor] : "",
                )}
              />
            )}
            <Input
              placeholder="Task name"
              className="w-full pl-9 rounded-xl border-none bg-gray-100"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </div>
          <Tabs
            defaultValue="color"
            onValueChange={(value: string) => setListType(value as ListType)}
            className="rounded-xl"
          >
            <TabsList className="grid rounded-xl w-full grid-cols-2">
              <TabsTrigger className="rounded-xl" value="color">
                Color
              </TabsTrigger>
              <TabsTrigger className="rounded-xl" value="emoji">
                Emoji
              </TabsTrigger>
            </TabsList>
            <TabsContent value="color">
              <div className="flex space-x-4">{colorButtons}</div>
            </TabsContent>
            <TabsContent value="emoji">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </TabsContent>
          </Tabs>
        </div>
        <Button
          size="sm"
          className="rounded-xl w-full mt-4 border-none"
          disabled={isPending}
          onClick={async () => {
            try {
              await execute({
                title: listName,
                color: selectedColor,
                emoji,
                listType,
              });
            } finally {
              resetForm();
              setIsOpen(false);
            }
          }}
        >
          Create task
        </Button>
      </PopoverContent>
    </Popover>
  );
}
