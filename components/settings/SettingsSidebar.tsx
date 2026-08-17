"use client";

import { User, Settings, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";

export type TabType = "profile" | "account";

interface SettingsSidebarProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
}

export function SettingsSidebar({
    activeTab,
    setActiveTab,
}: SettingsSidebarProps) {
    const { handleLogout } = useLogout();

    return (
        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:w-64 shrink-0 no-scrollbar md:min-h-[60vh]">
            <div className="flex md:flex-col gap-2 flex-1">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                        activeTab === "profile"
                            ? "bg-primary text-white shadow-md"
                            : "text-muted hover:bg-foreground/5"
                    }`}
                >
                    <User size={20} />
                    Profile
                </button>

                <button
                    onClick={() => setActiveTab("account")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                        activeTab === "account"
                            ? "bg-primary text-white shadow-md"
                            : "text-muted hover:bg-foreground/5"
                    }`}
                >
                    <Settings size={20} />
                    Account Management
                </button>
            </div>

            <div className="md:mt-8 md:pt-4 md:border-t border-foreground/10 shrink-0">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-foreground hover:bg-foreground/5"
                >
                    <LogOut size={20} />
                    Log Out
                </button>
            </div>
        </nav>
    );
}
