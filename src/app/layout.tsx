// app/layout.tsx
import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "../styles/globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import { darkTheme } from "@/components/CS_DarkTheme";
import GoBackButton from "@/components/CS_GoBack";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin", "cyrillic-ext"],
  variable: '--font-roboto',
});

const montserrat = Montserrat({
  weight: '800',
  subsets: ["latin"],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "VIKA DIGEST",
  description: "Modern news platform with cutting-edge design",
};

export default function RootLayout({
                                     children,
                                     modal
                                   }: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Montserrat:wght@800&display=swap"
            rel="stylesheet"
        />
      </head>
      <body className={`${roboto.variable} ${montserrat.variable}`}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <AppBar
            position="sticky"
            sx={{
              background: 'rgba(255,255,255,0.9)!important',
              backdropFilter: 'blur(10px)',
              boxShadow: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              py: 1
            }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <GoBackButton />
            <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #6C5CE7, #FF7675)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                  flexGrow: 1
                }}
            >
              VIKA DIGEST
            </Typography>
          </Toolbar>
        </AppBar>

        <main style={{ padding: '20px 0' }}>
          {children}
          {modal}
        </main>

      </ThemeProvider>
      </body>
      </html>
  );
}