"use client";

import { DailyGoalCard } from "@/components/dashboard/DailyGoalCard";
import { StatCards } from "@/components/dashboard/StatCards";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { NeedsReviewList } from "@/components/dashboard/NeedsReviewList";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useVocabStats } from "@/hooks/useVocabStats";
import { useVocabs } from "@/hooks/useVocabs";

export default function DashboardPage() {
    const { stats, isLoading: isStatsLoading } = useVocabStats();
    const { vocabs, isLoading: isVocabsLoading } = useVocabs();

    if (isStatsLoading || isVocabsLoading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </ProtectedRoute>
        );
    }

    const currentStats = stats || {
        total: 0,
        mastered: 0,
        learning: 0,
        userName: "User",
        streak: 0,
        dailyGoal: 20,
        reviewedToday: 0,
    };

    const userName = currentStats.userName;
    const userInitial = userName.charAt(0).toUpperCase();

    const realNeedsReview = vocabs
        .filter((v) => v.status === "LEARNING" && (v.mistakeCount || 0) > 0)
        .slice(0, 5);

    const realRecentActivity = [...vocabs]
        .sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA;
        })
        .slice(0, 5)
        .map((v) => ({
            id: v.id,
            word: v.word,
            addedAt: v.createdAt
                ? new Date(v.createdAt).toLocaleDateString()
                : "Unknown date",
        }));

    return (
        <ProtectedRoute>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">
                            Overview
                        </h1>
                        <p className="text-muted mt-1">
                            Here is your learning progress today.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-background border border-muted/20 px-4 py-2 rounded-full shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {userInitial}
                        </div>
                        <span className="text-sm font-medium">{userName}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-12">
                        <DailyGoalCard
                            reviewed={currentStats.reviewedToday}
                            target={currentStats.dailyGoal}
                        />
                        <StatCards
                            totalVocab={currentStats.total}
                            mastered={currentStats.mastered}
                            learning={currentStats.learning}
                        />
                    </div>

                    <div className="space-y-6">
                        <StreakCard streak={currentStats.streak} />
                        <NeedsReviewList items={realNeedsReview} />
                        <RecentActivityList items={realRecentActivity} />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
