import { CreateFsItemDropdown } from "@/components/CreateFsItemDropdown";
import FsItem from "@/components/FsItem";
import dbConnect from "@/lib/mongodb";
import FileSystemItem, { IFileSystemItem } from "@/models/FileSystemItem.model";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { folderId: string };
}) {
  await dbConnect();
  const folderId = params.folderId;
  try {
    const fsItem = await FileSystemItem.findById(folderId).populate("children");
    console.log(fsItem);
    if (!fsItem || fsItem.type !== "directory") {
      notFound();
    }
    return (
      <div>
        <h1>Folder: {fsItem.name}</h1>
        <CreateFsItemDropdown currentFolderId={folderId} />
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-[repeat(8,_minmax(0,_1fr))]">
          {fsItem.children?.map((item) => (
            <FsItem key={item._id as string} item={item} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
