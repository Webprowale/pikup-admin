import type { Metadata } from "next";
import { Be_Vietnam_Pro} from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import  Nav from "@/components/Nav"

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={beVietnam.className}>
      <SidebarProvider className="bg-[#ECECEC]">
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Nav />
        {children}
      </main>
    </SidebarProvider>
      </body>
    </html>
   
  )
}
