import mongoose, { Schema, Document, Model } from "mongoose";

interface IGenericFileSystemItem {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  path: string; // Full path like '/folder1/folder2'
  parentId: string;
}

export interface IFileSystemFile extends IGenericFileSystemItem {
  type: "file";
  content: string;
}

export interface IFileSystemDirectory extends IGenericFileSystemItem {
  type: "directory";
  children?: IFileSystemItem[];
  childrenIds?: string[];
}

export type IFileSystemItem = (IFileSystemFile | IFileSystemDirectory) &
  Document;

const FileSystemItemSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  path: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  content: { type: String },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "FileSystemItem",
  },
  childrenIds: [{ type: Schema.Types.ObjectId, ref: "FileSystemItem" }],
});

FileSystemItemSchema.virtual("children", {
  ref: "FileSystemItem",
  localField: "childrenIds",
  foreignField: "_id",
  justOne: false,
});

// make name unique in the same parent folder
FileSystemItemSchema.index({ name: 1, parentId: 1 }, { unique: true });

// This is important to avoid model overwrite in webpack HMR mode
const FileSystemItem =
  (mongoose.models.FileSystemItem as mongoose.Model<IFileSystemItem>) ||
  mongoose.model<IFileSystemItem>(
    "FileSystemItem",
    FileSystemItemSchema,
    "FileSystemItem"
  );

export default FileSystemItem;
