import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import dynamic from 'next/dynamic'
 
const Provider = dynamic(() => import('./provider'), { ssr: false })

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
        <Provider>
          <main>{children}</main>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
