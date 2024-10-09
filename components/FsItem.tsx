import { IFileSystemItem } from "@/models/FileSystemItem.model";
import { Copy, File, FolderClosed, Pen, Trash } from "lucide-react";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function FsItemCard({ item }: { item: IFileSystemItem }) {
  let Icon;
  switch (item.type) {
    case "directory":
      Icon = FolderClosed;
      break;
    case "file":
      Icon = File;
      break;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          href={(item._id as string).toString()}
          className="w-full p-3 group relative flex flex-col gap-5 border border-border rounded items-center text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          <Icon className="h-12 w-12 mt-5 text-secondary-foreground" />
          <span className="text-sm font-medium text-secondary-foreground truncate w-full text-center">
            {item.name}
          </span>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Pen className="h-5 w-5 mr-2" />
          Rename
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy className="h-5 w-5 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem>
          <Trash className="h-5 w-5 mr-2" />
          Remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
