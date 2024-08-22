import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FileSystemItem from "@/models/FileSystemItem.model";

export async function GET(req: NextRequest) {
  await dbConnect();
  const directory = req.nextUrl.searchParams.get("directory") || "";

  try {
    const query = directory ? { path: { $regex: `^${directory}` } } : {};
    const items = await FileSystemItem.find(query);
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  try {
    const item = await FileSystemItem.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
