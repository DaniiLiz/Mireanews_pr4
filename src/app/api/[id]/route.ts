import { NextRequest, NextResponse } from "next/server";
import data from "@/task_data.json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const post = data.find((post) => post.id == id);
  if (post) {
    return NextResponse.json({ success: true, post });
  } else {
    return NextResponse.json(
      {
        success: false,
        message: `Post #${id} not found`,
      },
      { status: 404 }
    );
  }
}
