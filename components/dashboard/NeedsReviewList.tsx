interface ReviewItem {
  id: number;
  word: string;
  meaning: string;
}

interface NeedsReviewListProps {
  items: ReviewItem[];
}

export function NeedsReviewList({ items }: NeedsReviewListProps) {
  return (
    <div className="bg-background border border-muted/10 rounded-[2rem] p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-danger"></span>
          Needs Review
        </h2>
        <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-danger/10 text-danger flex items-center justify-center font-bold group-hover:bg-danger group-hover:text-white transition-colors">
              {item.word.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm group-hover:text-primary transition-colors">{item.word}</p>
              <p className="text-xs text-muted truncate">{item.meaning}</p>
            </div>
            <div className="w-8 h-8 rounded-full border border-muted/20 flex items-center justify-center text-muted group-hover:bg-primary group-hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}