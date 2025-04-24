import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import type React from "react"; // Import React

import { Card } from "@/components/ui/card";
import { MessageCircleCodeIcon } from "lucide-react";
import AppSidebar from "@/components/myComponents/AppComponent/sideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Email/Chat App",
  description: "A simple email or chat application layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      
        
      <SidebarProvider>
        <div className="flex flex-col  w-full">
          <div className="w-full h-[2rem] text-red-300 ">
            <MessageCircleCodeIcon className="  text-green-300"/> Chat Away
          </div>
          <div className="flex w-full  h-screen  bg-background">
            <AppSidebar />
            <Card className=" w-full ">{children}</Card>
          </div>
        </div>
      </SidebarProvider>
      
    </div>
  );
}
