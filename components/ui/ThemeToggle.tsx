"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-lg bg-muted animate-pulse"></div>
        );
    }

    // ฟังก์ชันสลับโหมด
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-muted hover:text-primary transition-colors duration-200"
            aria-label="Toggle Dark Mode"
        >
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
}
