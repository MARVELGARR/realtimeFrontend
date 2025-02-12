import type { Metadata } from "next";
import { Inter } from "next/font/google";

import type React from "react"; // Import React


export const metadata: Metadata = {
  title: "Email/Chat App",
  description: "A simple email or chat application layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen w-full">{children}</div>;
}
