"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListType } from "@/db/schema";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import type { EmojiClickData } from "emoji-picker-react";
import { Plus } from "lucide-react";
import { useServerAction } from "zsa-react";

import { createList } from "../../_actions";
import { ColorButton, listColors, type ListColor } from "./color-button";
import { EmojiPicker } from "./emoji-picker";

const DEFAULT_EMOJI = "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f603.png";
const PLACEHOLDER_TEXT = "Task name";

export default function CreateListForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ListColor>("red");
  const [listName, setListName] = useState("");
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI);
  const [listType, setListType] = useState<ListType>("color");

  const { isPending, execute, isError, error, data } = useServerAction(createList);

  const handleColorClick = useCallback((color: ListColor) => setSelectedColor(color), []);
  const handleEmojiClick = useCallback((emoji: EmojiClickData) => setEmoji(emoji.imageUrl), []);

  const resetForm = useCallback(() => {
    setSelectedColor("red");
    setListName("");
    setEmoji(DEFAULT_EMOJI);
    setListType("color");
  }, []);

  const handleSubmit = useCallback(async () => {
    await execute({
      title: listName,
      color: selectedColor,
      emoji,
      listType,
    });

    if (isError) return;

    resetForm();
    setIsOpen(false);
    location.reload();
  }, [execute, listName, selectedColor, emoji, listType, isError, resetForm]);

  const colorButtons = useMemo(
    () =>
      Object.entries(listColors).map(([colorKey, colorValue]) => (
        <ColorButton
          key={colorKey}
          colorKey={colorKey as ListColor}
          colorValue={colorValue}
          isSelected={selectedColor === colorKey}
          onClick={handleColorClick}
        />
      )),
    [selectedColor, handleColorClick],
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Plus className="bg-foreground text-white dark:text-black rounded-full p-2" size={40} />
      </PopoverTrigger>
      <PopoverContent side={"bottom"} className="w-[300px] p-3 mb-16">
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
            <div className="w-full">
              <Input
                placeholder={PLACEHOLDER_TEXT}
                className={cn(
                  error?.fieldErrors?.title && "border-red-500",
                  "w-full pl-9 rounded-xl border-none",
                )}
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
              {isError && <span className="text-red-500 text-xs">{error.fieldErrors?.title}</span>}
            </div>
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
          onClick={handleSubmit}
        >
          {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Create"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
