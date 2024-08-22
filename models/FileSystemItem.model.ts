import mongoose, { Schema, Document } from "mongoose";

interface IFileSystemItem extends Document {
  name: string;
  type: "file" | "directory";
  path: string; // Full path like '/folder1/folder2/file.txt'
  content?: string; // Only applicable for files
}

const FileSystemItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["file", "directory"], required: true },
  path: { type: String, required: true, unique: true },
  content: { type: String, default: "" }, // Only for files
});

const FileSystemItem =
  mongoose.models.FileSystemItem ||
  mongoose.model<IFileSystemItem>("FileSystemItem", FileSystemItemSchema);

export default FileSystemItem;
