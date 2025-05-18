import { ReactNode } from "react";
import data from '@/task_data.json'

export async function generateStaticParams(){
  return data.map(e => ({id: e.id.toString()}));
}

export const dynamicParams = false;

export default async function EventLayout({ children }: Readonly<{ children: ReactNode}>){
  return <>{children}</>;
}