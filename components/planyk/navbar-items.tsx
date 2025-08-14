'use client'

import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'

import { useClerkAppearance } from '@/hooks/use-clerk-appearance'
import { Skeleton } from '@/components/ui/skeleton'

export function UserClerkButton() {
  const appearance = useClerkAppearance()

  return (
    <>
      <ClerkLoading>
        <Skeleton className='h-8 w-8 rounded-full' />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton
          appearance={appearance}
          showName={false}
          userProfileMode='navigation'
          userProfileUrl='/user-profile'
        />
      </ClerkLoaded>
    </>
  )
}
