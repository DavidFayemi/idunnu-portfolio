import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const syne = Syne({
  weight: ["600", "700"],
  variable: "--font-syne",
  display: "swap",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "[YOUR NAME] | Full-Stack Engineer",
  description: "Full-stack engineer crafting thoughtful digital experiences with code.",
  openGraph: {
    title: "[YOUR NAME] | Full-Stack Engineer",
    description: "Full-stack engineer crafting thoughtful digital experiences with code.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

const themeScript = `
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = storedTheme === 'light' || storedTheme === 'dark'
    ? storedTheme
    : prefersDark ? 'dark' : 'light';
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bg text-fg">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
