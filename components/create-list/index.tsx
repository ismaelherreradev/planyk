"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Emoji, type EmojiClickData } from "emoji-picker-react";
import { Plus } from "lucide-react";

import { ColorButton, taskColors, type TaskColor } from "./color-button";
import { EmojiPicker } from "./emoji-picker";

type TaskType = "color" | "emoji";

export default function CreateListForm() {
  const [selectedColor, setSelectedColor] = useState<TaskColor>("red");
  const [listName, setListName] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("1f60a");
  const [taskType, setTaskType] = useState<TaskType>("color");

  const handleColorClick = (color: TaskColor) => setSelectedColor(color);
  const handleEmojiClick = (emoji: EmojiClickData) => setEmoji(emoji.unified);

  const colorButtons = Object.entries(taskColors).map(([colorKey, colorValue]) => (
    <ColorButton
      key={colorKey}
      colorKey={colorKey as TaskColor}
      colorValue={colorValue}
      isSelected={selectedColor === colorKey}
      onClick={() => handleColorClick(colorKey as TaskColor)}
    />
  ));

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"lg"} className="rounded-3xl w-full border-none">
            <Plus size={14} className="mr-1" /> Create a new list
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-3">
          <div className="space-y-4">
            <div className="relative w-full">
              {taskType === "emoji" ? (
                <div className="absolute left-0 top-0 m-2.5">
                  <Emoji unified={emoji} size={20} />
                </div>
              ) : (
                <div
                  className={cn(
                    "h-5 w-5 m-2.5 rounded-full border-2 border-gray-500/50 absolute left-0 top-0",
                    taskType === "color" ? taskColors[selectedColor] : "",
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
              onValueChange={(value: string) => setTaskType(value as TaskType)}
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
          <Button size={"sm"} className="rounded-xl w-full mt-4 border-none">
            Create task
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
