// src/components/library/LibraryTabs.tsx

// 1. สร้าง Type บังคับไว้เลยว่า Tab ต้องมีแค่ 4 ชื่อนี้เท่านั้น (กันพิมพ์ผิด)
export type TabStatus = "All Words" | "Learning" | "Needs Review" | "Mastered";

// 2. รับ Props มาจากหน้าหลัก
interface LibraryTabsProps {
  activeTab: TabStatus;
  onTabChange: (tab: TabStatus) => void;
}

export function LibraryTabs({ activeTab, onTabChange }: LibraryTabsProps) {
  // สร้าง Array ของแท็บทั้งหมด
  const tabs: TabStatus[] = ["All Words", "Learning", "Needs Review", "Mastered"];

  return (
    <div className="border-b border-muted/20">
      <nav className="flex gap-6 overflow-x-auto hide-scrollbar pb-0.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)} // เมื่อกดปุ่ม ให้ส่งชื่อแท็บกลับไปบอกหน้าหลัก
            className={`pb-3 text-sm whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "font-bold text-primary border-b-2 border-primary" // สไตล์ตอนแท็บถูกเลือก (Active)
                : "font-medium text-muted hover:text-primary"        // สไตล์แท็บปกติ
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}