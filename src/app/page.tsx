import {
  Stack,
  Typography,
} from "@mui/material";
import { Metadata } from "next";
import data from "@/task_data.json";
import EventsMasonry from "@/components/CS_Masonry";
import { EventInfo } from "@/interfaces/EventInfo";

export const metadata: Metadata = {
  title: "News",
  keywords: ["react", "nextjs", "homework"],
  description: "Homework of react course for intro with NextJS",
};

export default function Home() {
  return (
    <Stack spacing={2} padding={2}>
      <Typography variant="h5" component="div" align="center">
        All the latest news of Vika
      </Typography>
      <EventsMasonry data={data as EventInfo[]}/>
    </Stack>
  );
}
