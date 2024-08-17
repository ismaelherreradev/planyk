import { ThemeToggle } from "@/components/theme-toggle";

import { UserClerkButton } from "./navbar-items";

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6">
      <nav className="flex w-full justify-end items-center">
        <div className="flex space-x-3">
          <UserClerkButton />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
