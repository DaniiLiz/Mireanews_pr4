import { NextResponse } from "next/server";
import data from '@/task_data.json'

export async function GET(){
  return NextResponse.json(data.map(each => each.id));
}