import type { Metadata } from "next";
import { Be_Vietnam_Pro} from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pikup - Revolutionizing Food Delivery", 
  description: "Your trusted platform for on-demand delivery services.", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={beVietnam.className}>{children} <ToastContainer /></body>
    </html>
  );
}