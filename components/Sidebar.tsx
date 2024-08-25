import Link from "next/link";
import { Button } from "./ui/button";
import { Folders } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

const sidebarMenu = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Photos", href: "/photos" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Settings", href: "/settings" },
  { label: "Help", href: "/help" },
  { label: "Log Out", href: "/api/auth/signout" },
];

const Sidebar = () => {
  return (
    <aside className="hidden h-full w-64 shrink-0 lg:block">
      <div className="flex flex-col p-[1px] w-full h-full border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link
          href={"/"}
          className="sticky top-0 flex items-center space-x-2 px-4 pt-5 hover:text-foreground/80 text-foreground/60"
        >
          <Folders />
          <span className="text-xl font-bold">Octo FS</span>
        </Link>
        <ScrollArea className="space-y-1 p-3">
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {sidebarMenu.map((link) => (
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start"
                key={link.href}
              >
                <Link className="text-primary" href={link.href}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default Sidebar;
