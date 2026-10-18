"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { mutate } from "swr";

type AuthContextValue = {
    isInitializing: boolean;
    isAuthenticated: boolean;
    startSession: (token: string) => void;
    endSession: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isInitializing, setIsInitializing] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    const isAuthenticated = !!token;

    const startSession = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const endSession = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        mutate(() => true, undefined, { revalidate: false });
    }, []);

    useEffect(() => {
        const handleSessionExpiredEvent = () => {
            endSession();
        };

        window.addEventListener("auth:session-expired", handleSessionExpiredEvent);

        return () => {
            window.removeEventListener("auth:session-expired", handleSessionExpiredEvent);
        };
    }, [endSession]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        // Read the saved session after hydration; one extra render is intentional.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setToken(storedToken);
        setIsInitializing(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isInitializing,
                isAuthenticated,
                startSession,
                endSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
