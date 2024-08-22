"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateFolderPopup } from "./CreateFolderPopup";

export function CreateFsItemDropdown({
  currentFolderId,
}: {
  currentFolderId: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <Plus className="fill-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <CreateFolderPopup currentFolderId={currentFolderId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            New Folder
          </DropdownMenuItem>
        </CreateFolderPopup>
        <DropdownMenuItem>New File</DropdownMenuItem>
        <DropdownMenuItem>Upload File</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
