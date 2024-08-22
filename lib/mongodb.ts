import FileSystemItem from "@/models/FileSystemItem.model";
import mongoose from "mongoose";
import path from "path";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function initializeDb() {
  // Create a root directory if it doesn't exist
  const rootDirectory = await FileSystemItem.findOne({
    type: "directory",
  }).catch((error) => {
    console.error("Error finding root directory", error);
  });
  if (!rootDirectory) {
    const root = new FileSystemItem({
      name: "root",
      type: "directory",
      path: "~",
    });
    await root.save();
    console.log("Root directory created");
  } else {
    console.log("Root directory already exists");
  }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
    await initializeDb();
    console.log("MongoDB connected");
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
