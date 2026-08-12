import { DailyGoalCard } from "@/components/dashboard/DailyGoalCard";
import { StatCards } from "@/components/dashboard/StatCards";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { NeedsReviewList } from "@/components/dashboard/NeedsReviewList";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// 1. จำลองข้อมูล (Mock Data) สำหรับ Phase 1
const mockStats = {
    totalVocab: 125,
    mastered: 45,
    learning: 80,
    streak: 5,
};

const mockDailyGoal = {
    reviewed: 12,
    target: 20,
};

const mockNeedsReview = [
    { id: 1, word: "Abundant", meaning: "มากมาย, อุดมสมบูรณ์" },
    { id: 2, word: "Deteriorate", meaning: "เสื่อมสภาพ, แย่ลง" },
    { id: 3, word: "Crucial", meaning: "สำคัญมาก, วิกฤต" },
];

const mockRecentActivity = [
    { id: 4, word: "Fascinate", addedAt: "2 hours ago" },
    { id: 5, word: "Obscure", addedAt: "5 hours ago" },
    { id: 6, word: "Versatile", addedAt: "1 day ago" },
];

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-10">
                {/* --- Section 1: Header --- */}
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
                            U
                        </div>
                        <span className="text-sm font-medium">
                            User Profile
                        </span>
                    </div>
                </div>

                {/* --- Section 2: Grid Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* คอลัมน์ซ้าย (Main Area) */}
                    <div className="lg:col-span-2 space-y-12">
                        <DailyGoalCard
                            reviewed={mockDailyGoal.reviewed}
                            target={mockDailyGoal.target}
                        />
                        <StatCards
                            totalVocab={mockStats.totalVocab}
                            mastered={mockStats.mastered}
                            learning={mockStats.learning}
                        />
                    </div>

                    {/* คอลัมน์ขวา (Right Sidebar) */}
                    <div className="space-y-6">
                        <StreakCard streak={mockStats.streak} />
                        <NeedsReviewList items={mockNeedsReview} />
                        <RecentActivityList items={mockRecentActivity} />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
