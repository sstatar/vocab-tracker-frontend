"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isInitializing } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated && !isInitializing) {
            router.replace("/login");
        }
    }, [router, isAuthenticated, isInitializing]);

    if (isInitializing || !isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return <>{children}</>;
}
