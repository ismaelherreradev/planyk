import { redirect } from "next/navigation";
import { formatDateToLocal } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";

export default async function Welcome({ user }: { user: User }) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <h1 className="text-4xl font-bold">Welcome, {fullName}! 👋🏼</h1>
      <p className="text-muted-foreground text-xl">
        Today, {formatDateToLocal(new Date().toISOString())}
      </p>
    </>
  );
}
