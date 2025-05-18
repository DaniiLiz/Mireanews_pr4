'use client';

import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function GoBackButton(){
  const pathname = usePathname();
  const router = useRouter();
  return pathname == '/' ? <></> : <IconButton onClick={() => router.back()}><ArrowBack/></IconButton>
}