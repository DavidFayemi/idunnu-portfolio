import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CursorProvider } from "@/components/motion/CursorProvider";
import { Cursor } from "@/components/motion/Cursor";
import "./globals.css";
import Script from "next/script";
// inside <head> or at the top of <body> in layout.tsx:

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
  description:
    "Full-stack engineer crafting thoughtful digital experiences with code.",
  openGraph: {
    title: "[YOUR NAME] | Full-Stack Engineer",
    description:
      "Full-stack engineer crafting thoughtful digital experiences with code.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`}
        </Script>
      </head>
      <body className="min-h-screen bg-bg text-fg">
        <CursorProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <Cursor />
        </CursorProvider>
      </body>
    </html>
  );
}
