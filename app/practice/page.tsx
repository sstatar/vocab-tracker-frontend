"use client";

import { useState } from "react";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { Flashcard } from "@/components/practice/Flashcard";
import { PracticeSummary } from "@/components/practice/PracticeSummary";

// --- Mock Data ---
const mockPracticeWords = [
  { id: 1, word: "Abundant", partOfSpeech: "adj.", meaning: "มากมาย, อุดมสมบูรณ์", example: "The country has an abundant supply of natural gas." },
  { id: 2, word: "Deteriorate", partOfSpeech: "v.", meaning: "เสื่อมสภาพ, แย่ลง", example: "His health began to deteriorate rapidly." },
  { id: 3, word: "Crucial", partOfSpeech: "adj.", meaning: "สำคัญมาก, วิกฤต", example: "It is crucial that we arrive on time." },
  { id: 4, word: "Fascinate", partOfSpeech: "v.", meaning: "ทำให้หลงใหล", example: "The beauty of the stars always fascinates me." },
  { id: 5, word: "Obscure", partOfSpeech: "adj.", meaning: "คลุมเครือ, ไม่ชัดเจน", example: "His origins remain obscure." },
];

export default function PracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [rememberedCount, setRememberedCount] = useState(0);

  const currentWord = mockPracticeWords[currentIndex];

  const handleNextWord = (gotIt: boolean) => {
    if (gotIt) setRememberedCount((prev) => prev + 1);

    if (currentIndex + 1 < mockPracticeWords.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between max-w-4xl mx-auto px-4 py-8">
      
      {/* 1. Header (ส่ง State ควบคุมหลอด Progress ลงไป) */}
      <PracticeHeader 
        currentIndex={currentIndex} 
        totalWords={mockPracticeWords.length} 
        isCompleted={isCompleted} 
      />

      {/* 2. Main Content (สลับหน้าจอตาม State isCompleted) */}
      <div className="flex-1 flex items-center justify-center py-8">
        {!isCompleted ? (
          // ใส่ key เป็น ID เพื่อให้ React รีเซ็ต State (คว่ำการ์ด) อัตโนมัติเมื่อเปลี่ยนคำ
          <Flashcard 
            key={currentWord.id} 
            wordData={currentWord} 
            onResult={handleNextWord} 
          />
        ) : (
          <PracticeSummary 
            totalWords={mockPracticeWords.length} 
            rememberedCount={rememberedCount} 
          />
        )}
      </div>

      {/* 3. Footer */}
      <div className="text-center text-xs text-muted">
        {!isCompleted && "Tip: Be honest with yourself! Clicking 'Forgot' will schedule the word for sooner review."}
      </div>

    </div>
  );
}