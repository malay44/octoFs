import dbConnect, { initializeDb } from "@/lib/mongodb";
import FileSystemItem, { IFileSystemItem } from "@/models/FileSystemItem.model";
import { redirect } from "next/navigation";

export default async function page() {
  await dbConnect();

  let rootFolderItem = (await FileSystemItem.findOne({
    path: "~",
  })) as IFileSystemItem;

  if (!rootFolderItem) {
    await initializeDb();
    rootFolderItem = (await FileSystemItem.findOne({
      path: "~",
    })) as IFileSystemItem;
  }

  return redirect(`/folders/${rootFolderItem._id}`);
}
