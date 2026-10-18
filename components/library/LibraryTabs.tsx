
export type TabStatus = "All Words" | "Learning" | "Needs Review" | "Mastered";

interface LibraryTabsProps {
  activeTab: TabStatus;
  onTabChange: (tab: TabStatus) => void;
}

export function LibraryTabs({ activeTab, onTabChange }: LibraryTabsProps) {
  const tabs: TabStatus[] = ["All Words", "Learning", "Needs Review", "Mastered"];

  return (
    <div className="border-b border-muted/20">
      <nav className="flex gap-6 overflow-x-auto hide-scrollbar pb-0.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-3 text-sm whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "font-bold text-primary border-b-2 border-primary"
                : "font-medium text-muted hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
