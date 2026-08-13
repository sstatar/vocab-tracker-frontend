"use client";

import { useSearchParams } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PracticeSession } from "@/components/practice/PracticeSession";
import { useVocabs } from "@/hooks/useVocabs";

export default function PracticePage() {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") || "all";

    const { vocabs, isLoading, error } = useVocabs();

    if (isLoading) {
        return (
            <ProtectedRoute>
                <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </ProtectedRoute>
        );
    }

    if (error) {
        return (
            <ProtectedRoute>
                <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center p-4 text-center text-danger">
                    <p className="mb-4">Error loading words: {error}</p>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <PracticeSession vocabs={vocabs} mode={mode} />
        </ProtectedRoute>
    );
}
