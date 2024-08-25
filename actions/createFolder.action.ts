"use server";

import dbConnect from "@/lib/mongodb";
import FileSystemItem, {
  IFileSystemDirectory,
} from "@/models/FileSystemItem.model";
import { mongo } from "mongoose";
import { revalidatePath } from "next/cache";

const MongoError = mongo.MongoError;

export interface ICreateFolderActionState {
  message?: string;
  error?: any;
  success?: boolean;
}

export async function createFolderAction(
  prevState: ICreateFolderActionState,
  formData: FormData
): Promise<ICreateFolderActionState> {
  try {
    dbConnect();

    const parentFolder = await FileSystemItem.findById(
      formData.get("parentFolderId") as string
    );

    if (!parentFolder || parentFolder.type !== "directory") {
      return {
        message: "Parent folder not found",
        success: false,
      };
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

    return {
      message: "Folder created successfully",
      success: true,
    };
  } catch (error) {
    if (error instanceof MongoError) {
      if (error.code === 11000) {
        return {
          message: "Folder with the same name already exists",
          success: false,
        };
      }
      return {
        message: error.message,
        success: false,
      };
    }
    return {
      message: (error as Error)?.message || "Internal Server error occurred",
      success: false,
    };
  }
}
