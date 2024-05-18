import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import SidebarContent from "./sidebar-content";

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
            <div className="">
                <Sidebar>
                    <SidebarContent />
                </Sidebar>
            </div>
            <main className="flex-1">{children}</main>
        </div>
    );
}
