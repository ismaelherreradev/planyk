import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const listColors = {
  red: "#ef4444",
  orange: "#f97316",
  yellow: "#eab308",
  green: "#22c55e",
  teal: "#14b8a6",
  blue: "#3b82f6",
  indigo: "#6366f1",
  purple: "#a855f7",
} as const;

export type ListColor = keyof typeof listColors;

export interface ColorButtonProps {
  colorKey: ListColor;
  colorValue: string;
  isSelected: boolean;
  onClick: (color: ListColor) => void;
}

export function ColorButton({ colorKey, colorValue, isSelected, onClick }: ColorButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onClick(colorKey)}
      className={cn(
        "h-6 w-6 rounded-full p-0 hover:scale-110 transition-transform",
        isSelected ? "ring-2 ring-foreground ring-offset-2" : "",
      )}
      style={{ backgroundColor: colorValue }}
    />
  );
}
