import { NextRequest, NextResponse } from "next/server";
import data from '@/task_data.json';

export async function GET(request: NextRequest){
  const { searchParams } = request.nextUrl;
  const rawPage = searchParams.get("page");
  const rawPerPage = searchParams.get("perPage");
  if(!rawPage || !rawPerPage){
    return NextResponse.json({succes: false, message: 'Search params `page` and `perPage` are required and both should be integers > 0'}, {status: 400})
  }
  const page = Number.parseInt(rawPage);
  const perPage = Number.parseInt(rawPerPage);
  if(isNaN(page) || isNaN(perPage) || page <= 0 || perPage <= 0){
    return NextResponse.json({succes: false, message: 'Both `page` and `perPage` should be integers > 0'}, {status: 400})
  }
  if(page > 1 && page * perPage > data.length){
    return NextResponse.json({succes: false, message: `We have only ${data.length} news, while you requested ${(page-1) * perPage}-${page * perPage}th`}, {status: 400})
  }
  return NextResponse.json(data.slice((page-1)*perPage, page*perPage));
}