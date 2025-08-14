import { useMemo } from 'react'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export function useClerkAppearance() {
  const { theme } = useTheme()

  return useMemo(() => {
    return {
      baseTheme: theme === 'dark' ? dark : undefined,
    }
  }, [theme])
}
