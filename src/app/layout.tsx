import type { Metadata } from "next";
import { jost } from "@/theme/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import dynamic from 'next/dynamic'

const Provider = dynamic(() => import('./provider'), { ssr: false })
import { EdgeStoreProvider } from '../lib/edgestore';

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
    <html lang="en" className={jost.className}>
      <body>
        <Provider>
          <EdgeStoreProvider>
            <main>{children}</main>
          </EdgeStoreProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
