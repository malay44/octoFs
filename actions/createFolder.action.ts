"use server";

import dbConnect from "@/lib/mongodb";
import FileSystemItem, {
  IFileSystemDirectory,
} from "@/models/FileSystemItem.model";
import { revalidatePath } from "next/cache";

export async function createFolderAction(formData: FormData) {
  dbConnect();

  const parentFolder = await FileSystemItem.findById(
    formData.get("parentFolderId") as string
  );

  if (!parentFolder || parentFolder.type !== "directory") {
    throw new Error("Parent folder not found");
  }

  const newFolder: IFileSystemDirectory = {
    name: formData.get("name") as string,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "directory",
    parentId: parentFolder._id as string,
    path: `${parentFolder.path}/${formData.get("name")}`,
  };

  const newFolderDocument = await new FileSystemItem(newFolder).save();

  if (!parentFolder.childrenIds) {
    parentFolder.childrenIds = [];
  }
  parentFolder.childrenIds.push(newFolderDocument._id as string);
  await parentFolder.save();

  revalidatePath(`/folders/${parentFolder._id}`);
}
