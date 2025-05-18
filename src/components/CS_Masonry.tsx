"use client";

import { EventInfo } from "@/interfaces/EventInfo";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import Link from "next/link";
import '../styles/cyber.css';

export default function EventsMasonry({ data }: { data: EventInfo[] }) {
  const [events, setEvents] = useState(data);
  const [currentType, setCurrentType] = useState('');
  const [query, setQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setEvents(data.filter(e => {
      if (currentType !== '') return currentType === e.type;
      return true;
    }).filter(e => {
      if (query !== '') return e.text.toLowerCase().includes(query.toLowerCase());
      return true;
    }));
  }, [currentType, query, data]);

  if (!isMounted) return null;

  return (
      <Box sx={{
        p: 2,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'radial-gradient(circle at center, #0a0a1a 0%, #000000 100%)'
      }}>
        {/* Фильтры */}
        <Box sx={{ mb: 4, filter: 'drop-shadow(0 0 8px #00f3ff)' }}>
          <Accordion sx={{
            background: 'rgba(0, 15, 30, 0.8)',
            border: '1px solid #00f3ff33',
            backdropFilter: 'blur(10px)'
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#00f3ff' }} />}>
              <Typography variant="h6" sx={{
                fontFamily: "'Cyber', sans-serif",
                color: '#00f3ff',
                textShadow: '0 0 8px #00f3ff'
              }}>
                КИБЕРФИЛЬТРЫ
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ py: 2 }}>
              <TextField
                  label="ПОИСК"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      color: '#00f3ff',
                      border: '1px solid #00f3ff55',
                      '&:hover fieldset': { borderColor: '#00f3ff' }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#00f3ff'
                    }
                  }}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
              />
              <RadioGroup
                  value={currentType}
                  onChange={(e) => setCurrentType(e.target.value)}
                  sx={{ gap: 2 }}
              >
                <FormControlLabel
                    value=""
                    control={<Radio sx={{ color: '#00f3ff' }} />}
                    label={<Typography sx={{
                      color: '#00f3ff',
                      fontFamily: "'Cyber', sans-serif"
                    }}>ВСЕ КАТЕГОРИИ</Typography>}
                />
                {Array.from(new Set(data.map(e => e.type))).map(type => (
                    <FormControlLabel
                        key={type}
                        value={type}
                        control={<Radio sx={{ color: '#00f3ff' }} />}
                        label={<Typography sx={{
                          color: '#00f3ff',
                          fontFamily: "'Cyber', sans-serif",
                          textShadow: '0 0 4px #00f3ff'
                        }}>
                          {type.substring(5)}
                        </Typography>}
                    />
                ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Горизонтальная рулетка */}
        <Box sx={{
          flex: 1,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(90deg, #00f3ff, #7d12ff)',
            borderRadius: 4,
            boxShadow: '0 0 8px #00f3ff'
          }
        }}>
          <Box sx={{
            display: 'flex',
            gap: 6,
            padding: '0 2rem 3rem',
            minWidth: 'max-content'
          }}>
            {events.map(event => (
                <Card key={event.id} sx={{
                  minWidth: 400,
                  maxWidth: 500,
                  scrollSnapAlign: 'center',
                  background: 'rgba(0, 10, 30, 0.6)',
                  border: '2px solid',
                  borderImage: 'linear-gradient(45deg, #00f3ff, #7d12ff) 1',
                  boxShadow: '0 0 20px #00f3ff80',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'scale(1.05) translateY(-10px)',
                    boxShadow: '0 0 40px #00f3ff'
                  }
                }}>
                  <Link href={`/event/${event.id}`}>
                    <CardActionArea sx={{ height: '100%', p: 2 }}>
                      {event.attachments[0] && (
                          <CardMedia
                              component="img"
                              image={event.attachments[0].image.src}
                              sx={{
                                height: 250,
                                objectFit: 'cover',
                                border: '2px solid #00f3ff',
                                borderRadius: 1,
                                filter: 'grayscale(0.8) contrast(1.2)'
                              }}
                          />
                      )}
                      <CardContent sx={{ pb: 0 }}>
                        <Typography variant="h6" gutterBottom sx={{
                          color: '#00f3ff',
                          fontFamily: "'Cyber', sans-serif",
                          fontSize: '1.4rem',
                          textShadow: '0 0 8px #00f3ff'
                        }}>
                          {event.text.substring(0, 60)}
                          {event.text.length > 60 && '...'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 2 }}>
                          <Chip
                              label={event.type.substring(5)}
                              sx={{
                                background: 'rgba(0, 243, 255, 0.15)',
                                color: '#00f3ff',
                                border: '1px solid #00f3ff55',
                                fontFamily: "'Cyber', sans-serif"
                              }}
                          />
                          <Chip
                              label={new Date(event.date * 1000).toLocaleDateString('ru-RU')}
                              sx={{
                                background: 'rgba(125, 18, 255, 0.15)',
                                color: '#7d12ff',
                                border: '1px solid #7d12ff55',
                                fontFamily: "'Cyber', sans-serif"
                              }}
                          />
                        </Box>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2, pt: 1 }}>
                        <Typography variant="body2" sx={{
                          color: '#00f3ff',
                          fontFamily: "'Courier New', monospace",
                          lineHeight: 1.4,
                          opacity: 0.8
                        }}>
                          {event.text.substring(0, 120)}...
                        </Typography>
                      </CardActions>
                    </CardActionArea>
                  </Link>
                </Card>
            ))}
          </Box>
        </Box>
      </Box>
  );
}