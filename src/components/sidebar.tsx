'use client'
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState, ReactNode } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import LogoutAction from "./forms/logout-action"
import { useUserSelector } from "@/store/hook"
import Link from "next/link"

const SidebarContext = createContext({ expanded: false })

export default function Sidebar({ children }: { children?: ReactNode }) {
    const [expanded, setExpanded] = useState(true)
    const user = useUserSelector(state => state.auth)

    return (
        <div className="h-full bg-slate-400">
            <aside className={`h-screen overflow-hidden sticky flex flex-1 left-0 top-0 z-50 bg-white border-r shadow-sm`}>
                <nav className="h-full flex flex-col">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img
                            src="https://img.logoipsum.com/243.svg"
                            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                                }`}
                            alt=""
                        />
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex p-3">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.fullName}background=CCCCCC&color=111111&bold=true`}
                            alt=""
                            className="w-10 h-10 rounded-md"
                        />
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                            <div className="leading-4">
                                <h4 className="font-semibold">{user.fullName?.toString() ?? ''}</h4>
                                <span className="text-xs text-gray-600">{user.username?.toString() ?? ''}</span>
                            </div>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreVertical size={20} />
                                </PopoverTrigger>
                                <PopoverContent className="w-40 flex flex-col p-1 transition-colors">
                                    <div className="hover:bg-accent p-2 duration-100 rounded-sm">My Profile</div>
                                    <LogoutAction variant="ghost" />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    )
}

interface SidebarItemProps {
    icon?: ReactNode,
    text?: string,
    active?: boolean,
    alert?: boolean,
    link: string,
}

export function SidebarItem({ icon, text, active, alert, link }: SidebarItemProps) {
    const { expanded } = useContext(SidebarContext)

    return (
        <Link href={link}>
            <li
                className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                        : "hover:bg-indigo-50 text-gray-600"
                    }
    `}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                        }`}
                >
                    {text}
                </span>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                            }`}
                    />
                )}

                {!expanded && (
                    <div
                        className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                    >
                        {text}
                    </div>
                )}
            </li>
        </Link>
    )
}