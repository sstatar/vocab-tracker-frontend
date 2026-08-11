// src/hooks/useVocabs.ts
import useSWR from "swr";
import { type Vocab } from "@/types";
import { vocabService } from "@/lib/vocab.service";

export function useVocabs() {
    // พารามิเตอร์ที่ 1: คีย์ (เหมือนชื่อแฟ้มเอกสาร) SWR จะใช้คีย์นี้ในการจำข้อมูล (Cache)
    // พารามิเตอร์ที่ 2: ฟังก์ชัน fetcher ที่เราเขียนไว้ใน Service
    const { data, error, isLoading, mutate } = useSWR<Vocab[]>(
        "/api/vocab",
        vocabService.getAllVocabs
    );

    return {
        vocabs: data || [], // ถ้ายังไม่มีข้อมูลให้คืนค่าอาร์เรย์ว่างไปก่อน
        isLoading,
        error: error ? error.message : null, // ดึงข้อความ error ออกมาถ้ามี
        refetch: mutate // ส่งฟังก์ชัน mutate ไปให้ UI เผื่อใช้บังคับโหลดข้อมูลใหม่
    };
}