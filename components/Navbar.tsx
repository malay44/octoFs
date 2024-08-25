import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggleButton } from "./ThemeToggleButton";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ul className="flex justify-between items-center space-x-4 p-3">
        <div></div>
        <ul className="flex gap-2 justify-end">
          <li>
            <Button asChild>
              <Link href={"/api/auth/signout"}>Log Out</Link>
            </Button>
          </li>
          <li>
            <ThemeToggleButton />
          </li>
        </ul>
      </ul>
    </nav>
  );
}
