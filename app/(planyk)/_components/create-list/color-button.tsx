import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const listColors = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  teal: "bg-teal-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
} as const;

export type ListColor = keyof typeof listColors;

export type ColorButtonProps = {
  colorKey: ListColor;
  colorValue: string;
  isSelected: boolean;
  onClick: (color: ListColor) => void;
};

export function ColorButton({ colorKey, colorValue, isSelected, onClick }: ColorButtonProps) {
  return (
    <Button
      key={colorKey}
      onClick={() => onClick(colorKey)}
      className={cn(
        "h-5 w-5 p-0 rounded-full",
        `hover:${colorValue}`,
        isSelected ? "border-2 border-gray-500/50" : "",
        colorValue,
      )}
    />
  );
}
