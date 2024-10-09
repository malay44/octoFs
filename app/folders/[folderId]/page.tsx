import { CreateFsItemDropdown } from "@/components/CreateFsItemDropdown";
import FsItem from "@/components/FsItem";
import dbConnect from "@/lib/mongodb";
import { notFound } from "next/navigation";
import { getParentIdsAndDocument } from "./helper";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { folderId: string };
}) {
  await dbConnect();
  const folderId = params.folderId;
  try {
    const { item: fsItem, parentIds } = await getParentIdsAndDocument(folderId);
    if (!fsItem || fsItem.type !== "directory") {
      notFound();
    }

    const parents = fsItem.path.split("/").slice(-parentIds.length - 1, -1);
    return (
      <div>
        <h1>Folder: {fsItem.name}</h1>
        <p>
          Path:{" "}
          {parentIds.map((id, index) => {
            const parent = parents[index];
            return (
              <Link key={id} href={`/folders/${id}`}>
                {parent}/
              </Link>
            );
          })}
        </p>
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
