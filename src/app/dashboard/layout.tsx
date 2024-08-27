import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import SidebarContent from "./sidebar-content";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Admin Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <EdgeStoreProvider>
                <div className="">
                    <Sidebar>
                        <SidebarContent />
                    </Sidebar>
                </div>
                <main className="flex-1">{children}</main>
            </EdgeStoreProvider>
        </div>
    );
}
