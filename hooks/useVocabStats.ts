import useSWR from "swr";
import { vocabService } from "@/lib/vocab.service";

export function useVocabStats() {
    // ใช้ SWR เพื่อดึงข้อมูลและทำ Caching ให้หน้าเว็บโหลดไวขึ้น
    const { data, error, isLoading, mutate } = useSWR(
        "/api/vocab/stats",
        vocabService.getVocabStats
    );

    return {
        stats: data, // ข้อมูลตัวเลข { total, mastered, learning, needsReview, progressPercentage }
        isLoading,
        error: error ? error.message : null,
        refetch: mutate // ฟังก์ชันสำหรับสั่งโหลดข้อมูลใหม่
    };
}