import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { Navbar } from "./_components/navbar";

export default async function LandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await currentUser();

  if (user) {
    redirect("/lists");
  }

  return (
    <div>
      <Navbar />
      <main className="container pt-28">{children}</main>
    </div>
  );
}
