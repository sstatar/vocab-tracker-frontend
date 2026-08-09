import { LibraryHeader } from "@/components/library/LibraryHeader";
import { LibraryTabs } from "@/components/library/LibraryTabs";
import { VocabCard } from "@/components/library/VocabCard"; // ลบ VocabType ออกจากตรงนี้
import { type Vocab } from "@/types"; // 1. ดึง type กลางเข้ามาใช้งาน (เปลี่ยน path ให้ตรงกับโฟลเดอร์ของคุณนะครับ)

// --- Mock Data ---
// 2. เปลี่ยนมาใช้ type Vocab[] และเติม createdAt กับ userId ให้ครบทุกคำ
const mockVocabs: Vocab[] = [
  { 
    id: "1", 
    word: "Abundant", 
    meaning: "มากมาย, อุดมสมบูรณ์", 
    partOfSpeech: "adj.", 
    status: "Mastered", 
    example: "The country has an abundant supply of natural gas.",
    createdAt: new Date().toISOString(), // จำลองวันที่สร้างเป็นวันนี้
    userId: "user-mock-123"              // จำลองไอดีผู้ใช้
  },
  { 
    id: "2", 
    word: "Deteriorate", 
    meaning: "เสื่อมสภาพ, แย่ลง", 
    partOfSpeech: "v.", 
    status: "Needs Review", 
    example: "His health began to deteriorate rapidly.",
    createdAt: new Date().toISOString(),
    userId: "user-mock-123"
  },
  { 
    id: "3", 
    word: "Crucial", 
    meaning: "สำคัญมาก, วิกฤต", 
    partOfSpeech: "adj.", 
    status: "Learning", 
    example: "It is crucial that we arrive on time.",
    createdAt: new Date().toISOString(),
    userId: "user-mock-123"
  },
  { 
    id: "4", 
    word: "Fascinate", 
    meaning: "ทำให้หลงใหล", 
    partOfSpeech: "v.", 
    status: "Learning", 
    example: "The beauty of the stars always fascinates me.",
    createdAt: new Date().toISOString(),
    userId: "user-mock-123"
  },
  { 
    id: "5", 
    word: "Obscure", 
    meaning: "คลุมเครือ, ไม่ชัดเจน", 
    partOfSpeech: "adj.", 
    status: "Needs Review", 
    example: "", // หรือจะใส่เป็น null ก็ได้แล้วแต่เราครับ
    createdAt: new Date().toISOString(),
    userId: "user-mock-123"
  },
];

export default function LibraryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Section 1: Header */}
      <LibraryHeader />

      {/* Section 2: Tabs */}
      <LibraryTabs />

      {/* Section 3: Word Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVocabs.map((vocab) => (
          <VocabCard key={vocab.id} vocab={vocab} />
        ))}
      </div>

    </div>
  );
}