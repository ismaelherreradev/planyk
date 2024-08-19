import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Paths, SiteConfig } from "@/config/site";

export async function Navbar() {
  return (
    <nav className="fixed inset-x-0 flex h-20">
      <div className="container flex w-full items-center justify-between  gap-4">
        <h1 className="scroll-m-20 text-3xl md:text-5xl font-semibold tracking-tight">
          {SiteConfig.title}
        </h1>
        <div className="space-x-4 flex">
          <Button size="sm" variant="ghost" asChild>
            <Link href={Paths.SignInPage}>Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={Paths.SignUpPage}>Get started</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
