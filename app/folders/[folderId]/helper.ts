import FileSystemItem, {
  FileSystemItemCollectionName,
  IFileSystemItem,
} from "@/models/FileSystemItem.model";
import mongoose from "mongoose";
import path from "path";

export async function getParentIdsAndDocument(
  itemId: string,
  depth: number = 3
): Promise<{ item: IFileSystemItem; parentIds: string[] }> {
  const result = await FileSystemItem.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(itemId) }, // Find the document by itemId
    },
    {
      $graphLookup: {
        from: FileSystemItemCollectionName, // The name of the collection
        startWith: "$parentId",
        connectFromField: "parentId",
        connectToField: "_id",
        depthField: "depth", // Field to store the depth of each parent
        maxDepth: depth - 1, // Limit the depth
        as: "parents",
      },
    },
    {
      $addFields: {
        sortedParents: {
          $sortArray: {
            input: "$parents",
            sortBy: { depth: -1 }, // Descending order (farthest parent first)
          },
        },
      },
    },
    {
      $lookup: {
        from: FileSystemItemCollectionName, // The name of the collection to join
        localField: "childrenIds", // The field from the input document to match
        foreignField: "_id", // The field in the 'from' collection to match against
        as: "children", // Output field for the matched child documents
      },
    },
    {
      $project: {
        item: {
          _id: "$_id",
          name: "$name",
          type: "$type",
          path: "$path",
          parentId: "$parentId",
          childrenIds: "$childrenIds",
          children: "$children",
        },
        parentIds: "$sortedParents._id", // Sorted parent IDs
      },
    },
  ]);

  if (!result || result.length === 0) {
    throw new Error("Item not found");
  }

  return {
    item: result[0].item,
    parentIds: result[0].parentIds || [],
  };
}
