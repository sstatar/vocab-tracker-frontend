export function LibraryTabs() {
  return (
    <div className="border-b border-muted/20">
      <nav className="flex gap-6 overflow-x-auto hide-scrollbar pb-0.5">
        <button className="pb-3 text-sm font-bold text-primary border-b-2 border-primary whitespace-nowrap">All Words</button>
        <button className="pb-3 text-sm font-medium text-muted hover:text-primary transition-colors whitespace-nowrap">Learning</button>
        <button className="pb-3 text-sm font-medium text-muted hover:text-primary transition-colors whitespace-nowrap">Needs Review</button>
        <button className="pb-3 text-sm font-medium text-muted hover:text-primary transition-colors whitespace-nowrap">Mastered</button>
      </nav>
    </div>
  );
}