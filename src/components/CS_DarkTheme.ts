// components/CS_DarkTheme.ts
'use client';

import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6C5CE7' },
    secondary: { main: '#FF7675' },
    background: { default: '#f8f9fa' }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: { fontWeight: 700, color: '#2d3436' }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s',
          '&:hover': { transform: 'translateY(-5px)' }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          padding: '12px 24px'
        }
      }
    }
  }
});