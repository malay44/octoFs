import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ul className="flex justify-between items-center space-x-4 p-2">
        <li className="transition-colors hover:text-foreground/80 text-foreground/60">
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/api/auth/signout"}>
            <Button>Log Out</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
