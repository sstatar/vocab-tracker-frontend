"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserMenu } from "./ui/UserMenu";
import { useLogout } from "@/hooks/useLogout";

export function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { handleLogout } = useLogout();

    return (
        <nav className="border-b border-muted/20 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="text-xl font-bold text-primary hover:text-primary-hover transition-colors"
                        >
                            VocabTracker
                        </Link>
                    </div>

                    {!isAuthPage && (
                        <>
                            <div className="hidden md:flex space-x-8">
                                <Link
                                    href="/"
                                    className="text-muted hover:text-primary transition-colors font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/library"
                                    className="text-muted hover:text-primary transition-colors font-medium"
                                >
                                    Vocab Library
                                </Link>
                            </div>

                            <div className="flex items-center space-x-2 md:space-x-4">
                                <div className="hidden md:block">
                                    <UserMenu />
                                </div>

                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="md:hidden p-2 rounded-md text-muted hover:text-primary hover:bg-muted/10 transition-colors"
                                    aria-label="Toggle Menu"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {isMenuOpen ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {!isAuthPage && isMenuOpen && (
                <div className="md:hidden border-t border-muted/20 bg-background px-4 pt-2 pb-4 space-y-2 shadow-lg">
                    <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-primary hover:bg-muted/10 transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/library"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-primary hover:bg-muted/10 transition-colors"
                    >
                        Vocab Library
                    </Link>
                    <Link
                        href="/settings"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-primary hover:bg-muted/10 transition-colors"
                    >
                        Settings
                    </Link>
                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            handleLogout();
                        }}
                        className="w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-danger hover:bg-danger/10 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
