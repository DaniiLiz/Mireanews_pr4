// app/event/[id]/page.tsx
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

export default async function CatchedModalEventModal({params}: { params: { id: string } }) {
  const post = data.find(item => item.id === Number(params.id)) as EventInfo;

  // Обработка случая, если пост не найден
  if (!post) return null;

  // Логика формирования заголовка
  const sentenceEnders = ['.', '!', '?'];
  const firstBreakIndex = Math.min(
      ...sentenceEnders.map(e => post.text.indexOf(e)).filter(i => i > 0),
      120
  );
  const title = post.text.slice(0, firstBreakIndex);

  const attachment = post.attachments[0];

  return (
      <Box sx={{ '& .MuiBackdrop-root': { backdropFilter: 'blur(8px)' }}}>
        <Backdrop
            open={true}
            sx={{
              background: 'radial-gradient(circle at center, rgba(108,92,231,0.1) 0%, rgba(255,255,255,0.9) 100%)',
            }}
        >
          <Card
              variant="outlined"
              sx={{
                width: '90vw',
                maxWidth: 800,
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                p: 3,
                transform: 'translateY(-5%)',
                animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
              }}
          >
            {post.attachments.length > 0 && (
                <CardMedia
                    component="img"
                    image={post.attachments[0].image.src}
                    alt="Event cover"
                    sx={{
                      borderRadius: 3,
                      height: 300,
                      objectFit: 'cover',
                      mb: 3
                    }}
                />
            )}

            <CardContent>
              <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800,
                    textAlign: "center",
                    background: 'linear-gradient(45deg, #6C5CE7 30%, #FF7675 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3
                  }}
              >
                {title}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Chip
                    label={new Date(post.date * 1000).toLocaleDateString()}
                    sx={{
                      background: 'rgba(108,92,231,0.1)',
                      color: '#6C5CE7',
                      fontWeight: 700
                    }}
                />
                <Chip
                    label={post.type.substring(5)}
                    sx={{
                      background: 'rgba(255,118,117,0.1)',
                      color: '#FF7675',
                      fontWeight: 700
                    }}
                />
              </Box>

              {post.text.length > title.length && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography
                        component="div"
                        variant="body1"
                        sx={{
                          fontFamily: 'Poppins',
                          lineHeight: 1.8,
                          color: '#2d3436',
                          whiteSpace: 'pre-line'
                        }}
                    >
                      {post.text.substring(title.length + 1)}
                    </Typography>
                  </>
              )}
            </CardContent>

            {attachment?.type === "LINK" && (
                <CardActions sx={{ pt: 0 }}>
                  <Link href={attachment.link} passHref legacyBehavior>
                    <Button
                        fullWidth
                        variant="contained"
                        endIcon={<OpenInNew />}
                        sx={{
                          bgcolor: '#6C5CE7',
                          '&:hover': { bgcolor: '#5C4BC4' },
                          borderRadius: 2,
                          py: 1.5,
                          textTransform: 'none',
                          fontSize: 16,
                          fontFamily: 'Poppins'
                        }}
                    >
                      {attachment.titleLink}
                    </Button>
                  </Link>
                </CardActions>
            )}
          </Card>
        </Backdrop>
      </Box>
  );
}