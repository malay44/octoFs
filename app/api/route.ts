import { NextResponse } from "next/server";
import { testDatabaseConnection } from "../actions";

export async function GET() {
  const isConnected = await testDatabaseConnection();
  return NextResponse.json({ connectedToDB: isConnected }, { status: 200 });
}
