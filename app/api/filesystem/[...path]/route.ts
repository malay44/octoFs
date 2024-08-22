import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FileSystemItem from "@/models/FileSystemItem.model";

// Handle GET, PUT, DELETE
export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  await dbConnect();
  const path = "/" + params.path.join("/");
  console.log("path", path);

  try {
    const item = await FileSystemItem.findOne({ path });
    if (!item) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  await dbConnect();
  const path = "/" + params.path.join("/");
  const body = await req.json();

  try {
    const item = await FileSystemItem.findOneAndUpdate({ path }, body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  await dbConnect();
  const path = "/" + params.path.join("/");

  try {
    const deletedItem = await FileSystemItem.findOneAndDelete({ path });
    if (!deletedItem) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
