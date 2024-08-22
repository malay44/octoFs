import { createFolderAction } from "@/actions/createFolder.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";

export function CreateFolderPopup({
  children,
  currentFolderId,
}: {
  children: React.ReactNode;
  currentFolderId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription>
            Create a new folder in the current directory.
          </DialogDescription>
        </DialogHeader>
        <form action={createFolderAction}>
          <input type="hidden" name="parentFolderId" value={currentFolderId} />
          <div className="py-4">
            <Input defaultValue="New Folder" name="name" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="secondary">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
