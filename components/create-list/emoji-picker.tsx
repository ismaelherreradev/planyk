import dynamic from "next/dynamic";
import type { EmojiClickData } from "emoji-picker-react";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false },
);

type EmojiPickerProps = {
  onEmojiClick: (emojiData: EmojiClickData, event: MouseEvent) => void;
};

export function EmojiPicker({ onEmojiClick }: EmojiPickerProps) {
  return <Picker width={275} skinTonesDisabled onEmojiClick={onEmojiClick} />;
}
