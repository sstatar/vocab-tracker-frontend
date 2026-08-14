"use client";

import { DailyGoalCard } from "@/components/dashboard/DailyGoalCard";
import { StatCards } from "@/components/dashboard/StatCards";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { NeedsReviewList } from "@/components/dashboard/NeedsReviewList";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// 🌟 1. Import Hooks ที่เราสร้างไว้
import { useVocabStats } from "@/hooks/useVocabStats";
import { useVocabs } from "@/hooks/useVocabs";

export default function DashboardPage() {
    // 🌟 2. เรียกใช้ข้อมูลจาก Backend
    const { stats, isLoading: isStatsLoading } = useVocabStats();
    const { vocabs, isLoading: isVocabsLoading } = useVocabs();

    // 🌟 3. โชว์ Loading ระหว่างรอข้อมูล
    if (isStatsLoading || isVocabsLoading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </ProtectedRoute>
        );
    }

    // --- เตรียมข้อมูลของจริงก่อนส่งให้ UI ---

    // Fallback เผื่อข้อมูลยังมาไม่ถึง
    const currentStats = stats || { total: 0, mastered: 0, learning: 0 };

    // คัดเฉพาะคำที่ต้องทบทวน 5 คำแรก
    const realNeedsReview = vocabs
        .filter((v) => v.status === "NEEDS_REVIEW")
        .slice(0, 5);

    // เรียงคำศัพท์ล่าสุด 5 คำ (ดูจาก createdAt)
    const realRecentActivity = [...vocabs]
        .sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA; // เรียงจากใหม่ไปเก่า
        })
        .slice(0, 5)
        .map((v) => ({
            id: v.id,
            word: v.word,
            // เช็กว่ามี createdAt ไหม ถ้ามีก็แปลงวันที่ ถ้าไม่มีก็ใส่คำว่า Unknown แทน
            addedAt: v.createdAt
                ? new Date(v.createdAt).toLocaleDateString()
                : "Unknown date",
        }));
    // (ส่วนนี้จำลองไว้ก่อน เพราะต้องไปสร้างระบบเก็บ History ใน DB อีกตารางในอนาคต)
    const mockDailyGoal = { reviewed: 0, target: 20 };
    const mockStreak = 1;

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
                    {/* คอลัมน์ซ้าย */}
                    <div className="lg:col-span-2 space-y-12">
                        <DailyGoalCard
                            reviewed={mockDailyGoal.reviewed}
                            target={mockDailyGoal.target}
                        />
                        <StatCards
                            totalVocab={currentStats.total}
                            mastered={currentStats.mastered}
                            learning={currentStats.learning}
                        />
                    </div>

                    {/* คอลัมน์ขวา */}
                    <div className="space-y-6">
                        <StreakCard streak={mockStreak} />
                        <NeedsReviewList items={realNeedsReview} />
                        <RecentActivityList items={realRecentActivity} />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
