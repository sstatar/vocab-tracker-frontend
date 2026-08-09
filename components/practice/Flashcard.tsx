"use client";

import { useState } from "react";

interface WordData {
  id: number;
  word: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
}

interface FlashcardProps {
  wordData: WordData;
  onResult: (gotIt: boolean) => void; // ฟังก์ชันส่งผลลัพธ์กลับไปให้ตัวแม่
}

export function Flashcard({ wordData, onResult }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      onClick={() => !isFlipped && setIsFlipped(true)}
      className={`w-full max-w-lg min-h-[380px] bg-background border-2 rounded-[2.5rem] p-8 sm:p-12 shadow-xl flex flex-col justify-between text-center transition-all cursor-pointer relative overflow-hidden ${
        isFlipped ? "border-primary/40 shadow-primary/5" : "border-muted/20 hover:border-primary/30"
      }`}
    >
      <div className="text-xs font-bold uppercase tracking-wider text-muted">
        {isFlipped ? "Meaning & Example" : "Click anywhere to flip"}
      </div>

      <div className="my-auto space-y-4 py-6">
        <div className="flex items-baseline justify-center gap-2">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground">{wordData.word}</h2>
          <span className="text-lg text-muted italic font-medium">{wordData.partOfSpeech}</span>
        </div>

        {isFlipped && (
          <div className="space-y-4 pt-4 border-t border-muted/10 animate-in fade-in duration-500">
            <p className="text-2xl font-bold text-primary">{wordData.meaning}</p>
            {wordData.example && (
              <p className="text-sm text-muted italic bg-muted/5 p-3 rounded-xl border border-muted/10">
                {wordData.example}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="h-14 flex items-center justify-center">
        {isFlipped ? (
          <div className="grid grid-cols-2 gap-4 w-full animate-in fade-in duration-200" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => onResult(false)}
              className="w-full flex items-center justify-center py-3.5 px-6 rounded-2xl border-2 border-danger/30 text-danger font-bold hover:bg-danger hover:text-white transition-all shadow-sm group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Forgot
            </button>
            <button 
              onClick={() => onResult(true)}
              className="w-full flex items-center justify-center py-3.5 px-6 rounded-2xl bg-primary text-white font-bold hover:bg-primary-hover transition-all shadow-md hover:shadow-lg group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Got it
            </button>
          </div>
        ) : (
          <p className="text-xs text-muted/60">Think of the meaning before flipping!</p>
        )}
      </div>
    </div>
  );
}