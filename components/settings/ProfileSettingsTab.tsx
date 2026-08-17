"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function ProfileSettingsTab() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState("");
    const [dailyGoal, setDailyGoal] = useState(20);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-10 animate-fade-in">
            <section>
                <h2 className="text-xl font-bold mb-6 border-b border-foreground/10 pb-4">
                    Profile Information
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Guitar"
                            className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-transparent text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Daily Goal
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={dailyGoal}
                            onChange={(e) =>
                                setDailyGoal(Number(e.target.value))
                            }
                            className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-transparent text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                        <p className="text-sm text-muted mt-2">
                            Number of words you aim to review daily.
                        </p>
                    </div>
                    <div className="pt-4">
                        <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all cursor-pointer">
                            Save Changes
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-6 border-b border-foreground/10 pb-4">
                    Appearance
                </h2>
                <div className="space-y-4">
                    <label className="block text-sm font-medium mb-4">
                        Theme Preference
                    </label>
                    {mounted && (
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setTheme("light")}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-medium transition-all cursor-pointer ${
                                    theme === "light"
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-foreground/10 text-muted hover:border-foreground/30 hover:bg-foreground/5"
                                }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line
                                        x1="4.22"
                                        y1="4.22"
                                        x2="5.64"
                                        y2="5.64"
                                    />
                                    <line
                                        x1="18.36"
                                        y1="18.36"
                                        x2="19.78"
                                        y2="19.78"
                                    />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line
                                        x1="4.22"
                                        y1="19.78"
                                        x2="5.64"
                                        y2="18.36"
                                    />
                                    <line
                                        x1="18.36"
                                        y1="5.64"
                                        x2="19.78"
                                        y2="4.22"
                                    />
                                </svg>
                                Light
                            </button>

                            <button
                                onClick={() => setTheme("dark")}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-medium transition-all cursor-pointer ${
                                    theme === "dark"
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-foreground/10 text-muted hover:border-foreground/30 hover:bg-foreground/5"
                                }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                                Dark
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
