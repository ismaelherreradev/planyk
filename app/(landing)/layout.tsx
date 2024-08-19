// import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";

// import { Paths } from "@/config/site";
import { Navbar } from "./_components/navbar";

export default function LandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const { userId } = auth();

  // if (userId) {
  //   return;
  // }

  return (
    <div>
      <Navbar />
      <main className="container pt-28">{children}</main>
    </div>
  );
}
