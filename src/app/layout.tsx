import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/sidebar";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
