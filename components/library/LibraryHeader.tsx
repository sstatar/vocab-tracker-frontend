"use client"; // เพิ่มบรรทัดนี้ เพราะเรากำลังใช้ useState

import { useState } from "react";
import { AddVocabModal } from "./AddVocabModal";

export function LibraryHeader() {
  // สร้าง State สำหรับเปิด/ปิด Modal (ค่าเริ่มต้นคือปิด = false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Library</h1>
          <p className="text-muted mt-1 text-sm">Manage your vocabulary collection</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 bg-background border border-muted/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* ปุ่ม Practice */}
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-background border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm font-bold shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Practice
          </button>

          {/* ปุ่ม Add New Word (กดแล้วเปลี่ยน State เป็น true) */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-primary text-white p-2.5 rounded-lg hover:bg-primary-hover transition-colors shadow-sm flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* เรียกใช้งาน Modal พร้อมส่ง props ควบคุมการเปิด/ปิดไปให้ */}
      <AddVocabModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}