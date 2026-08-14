export interface RecentActivityItem {
  id: string;
  word: string;
  addedAt: string;
}

interface RecentActivityListProps {
  items: RecentActivityItem[]; // 2. เปลี่ยนมาใช้ Type ตัวใหม่
}

export function RecentActivityList({ items }: RecentActivityListProps) {
  return (
    <div className="bg-background border border-muted/10 rounded-[2rem] p-6 shadow-lg">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Recently Added
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary/50"></div>
              <span className="font-medium text-sm">{item.word}</span>
            </div>
            <span className="text-xs text-muted bg-muted/10 px-2 py-1 rounded-md">{item.addedAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}