import Link from "next/link";

interface PracticeHeaderProps {
  currentIndex: number;
  totalWords: number;
  isCompleted: boolean;
}

export function PracticeHeader({ currentIndex, totalWords, isCompleted }: PracticeHeaderProps) {
  const progressPercent = Math.round(((currentIndex + (isCompleted ? 0 : 1)) / totalWords) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link 
          href="/library" 
          className="flex items-center gap-2 text-muted hover:text-foreground transition-colors font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Exit Practice
        </Link>
        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          {!isCompleted ? `${currentIndex + 1} of ${totalWords}` : "Done!"}
        </span>
      </div>

      <div className="w-full bg-muted/10 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${isCompleted ? 100 : progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
}