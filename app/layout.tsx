import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/providers/tanstack";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/next-theme";
import { SessionProvider } from "@/providers/sessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wellcome to Mr Young",
  description: "Connect and chat with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white antialiased`}
      >

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >


          <Toaster />
          <TanstackProvider>
            <SessionProvider>
            {children}
            </SessionProvider>
            </TanstackProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
