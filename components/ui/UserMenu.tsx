"use client";

import { Fragment } from "react";
import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    Transition,
} from "@headlessui/react";
import Link from "next/link";
import { Settings, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import useSWR from "swr";
import { userService } from "@/lib/user.service";
import { useLogout } from "@/hooks/useLogout";

export function UserMenu() {
    const { theme, setTheme } = useTheme();
    const { handleLogout } = useLogout();

    const { data: profile } = useSWR("profile", userService.getProfile);
    const displayName = profile?.name || "Student";

    return (
        <Menu as="div" className="relative inline-block text-left z-50">
            <MenuButton className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white text-sm font-bold hover:ring-2 hover:ring-primary/50 transition-all outline-none cursor-pointer shadow-sm">
                {displayName.charAt(0).toUpperCase()}
            </MenuButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-background border border-foreground/10 shadow-lg outline-none overflow-hidden">
                    <div className="px-4 py-3 border-b border-foreground/10 bg-foreground/5">
                        <p className="text-xs text-muted">Signed in as</p>
                        <p className="text-sm font-bold truncate text-foreground">
                            {displayName}
                        </p>
                    </div>

                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <Link
                                    href="/settings"
                                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                        active
                                            ? "bg-foreground/5 text-primary"
                                            : "text-muted hover:text-foreground"
                                    }`}
                                >
                                    <Settings size={16} />
                                    Account Settings
                                </Link>
                            )}
                        </MenuItem>

                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={() =>
                                        setTheme(
                                            theme === "dark" ? "light" : "dark",
                                        )
                                    }
                                    className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                        active
                                            ? "bg-foreground/5 text-primary"
                                            : "text-muted hover:text-foreground"
                                    }`}
                                >
                                    {theme === "dark" ? (
                                        <Sun size={16} />
                                    ) : (
                                        <Moon size={16} />
                                    )}
                                    Theme: {theme === "dark" ? "Dark" : "Light"}
                                </button>
                            )}
                        </MenuItem>

                        <div className="h-px bg-foreground/10 my-1" />

                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={handleLogout}
                                    className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                                        active
                                            ? "bg-red-500/10 text-red-500"
                                            : "text-danger hover:text-red-600"
                                    }`}
                                >
                                    <LogOut size={16} />
                                    Log Out
                                </button>
                            )}
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
}
