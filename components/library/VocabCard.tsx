"use client";

import { useState } from "react";
import { EditVocabModal } from "./EditVocabModal";
import { type Vocab } from "@/types"; // เปลี่ยน path ชี้ไปที่ไฟล์ type กลางของคุณ

// เปลี่ยนมารับค่าจาก type Vocab หลัก
interface VocabCardProps {
  vocab: Vocab;
}

export function VocabCard({ vocab }: VocabCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  let statusColor = "bg-blue-500";
  if (vocab.status === "Mastered") statusColor = "bg-green-500";
  if (vocab.status === "Needs Review") statusColor = "bg-danger";

  return (
    <>
      <div className="bg-background border border-muted/20 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col justify-between min-h-[160px]">
        {/* ... (โค้ดด้านในเหมือนเดิมทุกประการ) ... */}
        
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-bold text-foreground">{vocab.word}</h3>
              <span className="text-xs font-medium text-muted italic">{vocab.partOfSpeech}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/5 px-2 py-1 rounded-md border border-muted/10">
              <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`}></span>
              <span className="text-[10px] font-medium text-muted">{vocab.status}</span>
            </div>
          </div>

          <p className="text-sm font-medium text-foreground/80 mb-3">{vocab.meaning}</p>
          
          {vocab.example && (
            <p className="text-xs text-muted italic line-clamp-2 border-l-2 border-muted/20 pl-2">
              {vocab.example}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-muted/10 flex justify-end gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
          {vocab.status !== "Mastered" && (
            <button className="text-xs font-medium text-green-600 hover:underline transition-all">
              Mark as Mastered
            </button>
          )}
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="text-muted hover:text-primary transition-colors" 
              aria-label="Edit Word"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
            <button className="text-muted hover:text-danger transition-colors" aria-label="Delete Word">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      <EditVocabModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        vocab={vocab} 
      />
    </>
  );
}