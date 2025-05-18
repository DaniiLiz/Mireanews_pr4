'use client';
import { Chip, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

export default function NotFoundPage(){
  const pathname = usePathname();
  return (<>
    <Typography variant={'h4'} component={'div'} sx={{margin: 5, textAlign: 'center'}}>URL address <pre><Chip label={pathname} sx={{fontSize: 32}}/></pre> was not found on this server!</Typography>
  </>)
}