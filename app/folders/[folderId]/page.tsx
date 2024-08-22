import { CreateFsItemDropdown } from "@/components/CreateFsItemDropdown";
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
        <ul>
          {fsItem.children?.map((item) => (
            <li key={item.name}>
              <a href={`/folders/${item._id}`}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
