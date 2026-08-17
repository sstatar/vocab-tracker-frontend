"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-wrap gap-4">
            <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-medium transition-all cursor-pointer ${
                    theme === "light"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-foreground/10 text-muted hover:border-foreground/30 hover:bg-foreground/5"
                }`}
            >
                <Sun size={18} />
                Light
            </button>

            <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-medium transition-all cursor-pointer ${
                    theme === "dark"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-foreground/10 text-muted hover:border-foreground/30 hover:bg-foreground/5"
                }`}
            >
                <Moon size={18} />
                Dark
            </button>
        </div>
    );
}
