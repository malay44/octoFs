import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Folders } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ul className="flex justify-between items-center space-x-4 p-3">
        <li className="transition-colors hover:text-foreground/80 text-foreground/60">
          <Link href={"/"} className="flex items-center space-x-2">
            <Folders />
            <span className="text-xl font-bold">Octo FS</span>
          </Link>
        </li>
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
