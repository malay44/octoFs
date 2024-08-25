import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ThemeToggleButton";

export default function Navbar() {
  return (
    <nav className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40 supports-[backdrop-filter]:bg-background/60">
      <ul className="flex justify-between items-center space-x-4 p-3">
        <div></div>
        <ul className="flex gap-2 justify-end">
          <li>
            <ModeToggle />
          </li>
        </ul>
      </ul>
    </nav>
  );
}
