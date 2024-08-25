"use client";

import {
  createFolderAction,
  ICreateFolderActionState,
} from "@/actions/createFolder.action";
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
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState: ICreateFolderActionState = {
  message: "",
};

export function CreateFolderPopup({
  children,
  currentFolderId,
}: {
  children: React.ReactNode;
  currentFolderId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [formResponse, formAction] = useFormState(
    createFolderAction,
    initialState
  );

  React.useEffect(() => {
    if (formResponse.success) {
      setOpen(false);
    }
  }, [formResponse.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription>
            Create a new folder in the current directory.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type="hidden" name="parentFolderId" value={currentFolderId} />
          <div className="py-4 min-w-0 grid">
            <Input
              defaultValue="New Folder"
              name="name"
              error={!formResponse.success ? formResponse.message : undefined}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending: isPending } = useFormStatus();
  return (
    <Button type="submit" variant="secondary" disabled={isPending}>
      {isPending ? (
        <>
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          Creating Folder
        </>
      ) : (
        "Create Folder"
      )}
    </Button>
  );
}
