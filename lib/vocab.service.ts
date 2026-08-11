// src/lib/vocab.service.ts
import { type Vocab } from "@/types"; // ดึง Type กลางที่เราสร้างไว้มาใช้

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const vocabService = {
    // ฟังก์ชันดึงคำศัพท์ทั้งหมด พร้อมระบุว่าจะคืนค่ากลับมาเป็น Array ของ Vocab (Vocab[])
    getAllVocabs: async (): Promise<Vocab[]> => {

        // 1. ล้วงกระเป๋าหยิบ Token ออกมาจาก localStorage
        const token = localStorage.getItem("token");

        // 2. ดักทางไว้ก่อน: ถ้าไม่มี Token แปลว่าแอบเข้าหน้านี้โดยไม่ได้ Login
        if (!token) {
            throw new Error("No authentication token found. Please login.");
        }

        // 3. ยิง API ไปหา Backend พร้อมแนบ Token ไปใน Headers
        const response = await fetch(`${API_URL}/vocab`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // สำคัญที่สุด: ต้องมีเว้นวรรค 1 เคาะหลังคำว่า Bearer เสมอครับ
                "Authorization": `Bearer ${token}`
            },
        });

        const data = await response.json();

        // 4. ถ้า Backend ตอบกลับมาว่ามี Error (เช่น Token หมดอายุ หรือพัง)
        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch vocabularies");
        }

        // 5. ถ้าสำเร็จ ส่งข้อมูลคำศัพท์กลับไปให้คนเรียกใช้ (Hook)
        return data;
    }
};