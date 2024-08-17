"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useClerkAppearance } from "@/hooks/use-clerk-appearance";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

export function UserClerkButton() {
  const appearance = useClerkAppearance();

  return (
    <>
      <ClerkLoading>
        <Skeleton className="w-8 h-8 rounded-full " />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton appearance={appearance} />
      </ClerkLoaded>
    </>
  );
}
