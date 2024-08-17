import { useMemo } from "react";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";

export function useClerkAppearance() {
  const { theme } = useTheme();

  return useMemo(() => {
    return {
      baseTheme: theme === "dark" ? dark : experimental__simple,
    };
  }, [theme]);
}
