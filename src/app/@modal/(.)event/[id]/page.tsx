import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography
} from "@mui/material";
import data from '@/task_data.json'
import {EventInfo} from "@/interfaces/EventInfo";
import Link from "next/link";
import {OpenInNew} from "@mui/icons-material";

export default async function CatchedModalEventModal({params}: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const post = data.find(item => item.id == Number.parseInt(id)) as EventInfo;
  const firstDot = post.text.indexOf(".");
  const firstAccent = post.text.indexOf("!");
  const firstQuestion = post.text.indexOf("?");
  const dividerPos = [firstDot, firstAccent, firstQuestion, 120]
    .filter((n) => n > 0)
    .reduce((p, n) => {
      return p < n ? p : n;
    }, 120);
  const title =
    dividerPos < post.text.length
      ? post.text.substring(0, dividerPos)
      : post.text;

  const attachment = post.attachments.length > 0 ? post.attachments[0] : null;
  return (
    <Box>
      <Backdrop open={true}>
        <Card variant={'outlined'} sx={{maxWidth: '80%', maxHeight: '80%', overflowY: 'scroll', padding: 4}}>
          <CardMedia image={post.attachments[0]?.image.src} component={"img"}/>
          <CardContent>
            <Typography
              component={"div"}
              variant={"h4"}
              sx={{textAlign: "center"}}
            >
              {title}
            </Typography>
            <Typography sx={{margin: 1}} component={"div"}>
              When: <Chip label={new Date(post.date * 1000).toLocaleDateString()}/>
            </Typography>
            <Typography sx={{margin: 1}} component={"div"}>
              Event type: <Chip label={post.type.substring(5)}/>
            </Typography>
            {post.text.length > title.length && (
              <>
                <Divider sx={{margin: 1}}/>
                {post.text.substring(title.length + 1).split('\n').map((text, i) => <Typography
                  key={'wrap-' + i}>{text}</Typography>)}
              </>
            )}
          </CardContent>
          {attachment && attachment.type === "LINK" && (
            <CardActions>
              <Link href={attachment.link} target={'_blank'} title={attachment.titleLink} style={{width: '100%'}}>
                <Button variant={'contained'} sx={{width: '100%'}}
                        endIcon={<OpenInNew/>}>{attachment.titleLink}</Button>
              </Link>
            </CardActions>
          )}
        </Card>
      </Backdrop>
    </Box>
  );
}