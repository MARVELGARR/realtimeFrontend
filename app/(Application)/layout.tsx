import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import type React from "react" // Import React
import { AppSidebar } from "@/components/myComponents/AppComponent/sideBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Email/Chat App",
  description: "A simple email or chat application layout",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
        <SidebarProvider>
          
          <div className="flex h-screen w-full">
            <AppSidebar />
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

