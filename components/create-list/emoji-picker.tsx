"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Smile } from "lucide-react";

interface Emoji {
  id: string;
  native: string;
  name: string;
  unified: string;
}

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const COMMON_EMOJIS = [
  { id: "grinning", native: "😀", name: "grinning", unified: "1f600" },
  { id: "smiley", native: "😃", name: "smiley", unified: "1f603" },
  { id: "smile", native: "😄", name: "smile", unified: "1f604" },
  { id: "grin", native: "😁", name: "grin", unified: "1f601" },
  { id: "laughing", native: "😆", name: "laughing", unified: "1f606" },
  { id: "sweat_smile", native: "😅", name: "sweat smile", unified: "1f605" },
  { id: "joy", native: "😂", name: "joy", unified: "1f602" },
  { id: "slightly_smiling_face", native: "🙂", name: "slightly smiling", unified: "1f642" },
  { id: "upside_down_face", native: "🙃", name: "upside down", unified: "1f643" },
  { id: "wink", native: "😉", name: "wink", unified: "1f609" },
  { id: "blush", native: "😊", name: "blush", unified: "1f60a" },
  { id: "innocent", native: "😇", name: "innocent", unified: "1f607" },
  { id: "heart_eyes", native: "😍", name: "heart eyes", unified: "1f60d" },
  { id: "kissing_heart", native: "😘", name: "kissing heart", unified: "1f618" },
  { id: "kissing", native: "😗", name: "kissing", unified: "1f617" },
  { id: "relaxed", native: "☺️", name: "relaxed", unified: "263a-fe0f" },
  { id: "thinking_face", native: "🤔", name: "thinking", unified: "1f914" },
  { id: "neutral_face", native: "😐", name: "neutral", unified: "1f610" },
  { id: "expressionless", native: "😑", name: "expressionless", unified: "1f611" },
  { id: "no_mouth", native: "😶", name: "no mouth", unified: "1f636" },
  { id: "smirk", native: "😏", name: "smirk", unified: "1f60f" },
  { id: "unamused", native: "😒", name: "unamused", unified: "1f612" },
  { id: "face_with_rolling_eyes", native: "🙄", name: "eye roll", unified: "1f644" },
  { id: "grimacing", native: "😬", name: "grimacing", unified: "1f62c" },
  { id: "lying_face", native: "🤥", name: "lying", unified: "1f925" },
  { id: "relieved", native: "😌", name: "relieved", unified: "1f60c" },
  { id: "pensive", native: "😔", name: "pensive", unified: "1f614" },
  { id: "sleepy", native: "😪", name: "sleepy", unified: "1f62a" },
  { id: "drooling_face", native: "🤤", name: "drooling", unified: "1f924" },
  { id: "sleeping", native: "😴", name: "sleeping", unified: "1f634" },
  { id: "mask", native: "😷", name: "mask", unified: "1f637" },
  { id: "face_with_thermometer", native: "🤒", name: "sick", unified: "1f912" },
  { id: "sunglasses", native: "😎", name: "sunglasses", unified: "1f60e" },
  { id: "dizzy_face", native: "😵", name: "dizzy", unified: "1f635" },
  { id: "exploding_head", native: "🤯", name: "exploding head", unified: "1f92f" },
  { id: "cowboy_hat_face", native: "🤠", name: "cowboy", unified: "1f920" },
  { id: "partying_face", native: "🥳", name: "party", unified: "1f973" },
  { id: "disguised_face", native: "🥸", name: "disguised", unified: "1f978" },
  { id: "heart", native: "❤️", name: "heart", unified: "2764-fe0f" },
  { id: "orange_heart", native: "🧡", name: "orange heart", unified: "1f9e1" },
  { id: "yellow_heart", native: "💛", name: "yellow heart", unified: "1f49b" },
  { id: "green_heart", native: "💚", name: "green heart", unified: "1f49a" },
  { id: "blue_heart", native: "💙", name: "blue heart", unified: "1f499" },
  { id: "purple_heart", native: "💜", name: "purple heart", unified: "1f49c" },
  { id: "fire", native: "🔥", name: "fire", unified: "1f525" },
  { id: "star", native: "⭐", name: "star", unified: "2b50" },
  { id: "sparkles", native: "✨", name: "sparkles", unified: "2728" },
  { id: "rocket", native: "🚀", name: "rocket", unified: "1f680" },
  { id: "bulb", native: "💡", name: "bulb", unified: "1f4a1" },
  { id: "coffee", native: "☕", name: "coffee", unified: "2615" },
  { id: "pizza", native: "🍕", name: "pizza", unified: "1f355" },
  { id: "tada", native: "🎉", name: "tada", unified: "1f389" },
];

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmojis, setFilteredEmojis] = useState(COMMON_EMOJIS);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEmojis(COMMON_EMOJIS);
      return;
    }

    const filtered = COMMON_EMOJIS.filter((emoji) =>
      emoji.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredEmojis(filtered);
  }, [searchTerm]);

  const handleEmojiClick = (emoji: Emoji) => {
    onEmojiSelect(emoji.native);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-9 bg-background border-border/50"
        />
      </div>

      <div className="max-h-48 overflow-y-auto">
        {filteredEmojis.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Smile className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No emojis found</p>
          </div>
        ) : (
          <div className="grid grid-cols-8 gap-1">
            {filteredEmojis.map((emoji) => (
              <Button
                key={emoji.id}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted/50 text-lg"
                onClick={() => handleEmojiClick(emoji)}
                title={emoji.name}
              >
                {emoji.native}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
