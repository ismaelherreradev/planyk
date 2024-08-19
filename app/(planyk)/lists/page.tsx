import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import Welcome from "../_components/welcome";

export default async function PlanykPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="grid place-content-center mt-20">
      <Welcome user={user} />
      <p className="text-muted-foreground  text-xl mt-10">
        You have no plans for today. Select a list! 🎉
      </p>
    </div>
  );
}
