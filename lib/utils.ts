import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and normalizes class names using `clsx` and `tailwind-merge`.
 * @param inputs - Class names to merge.
 * @returns Merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a local date format.
 * @param dateStr - The date string to format.
 * @param locale - The locale to use for formatting (default is 'en-US').
 * @returns The formatted date string.
 */
export const formatDateToLocal = (dateStr: string, locale = "en-US"): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};
