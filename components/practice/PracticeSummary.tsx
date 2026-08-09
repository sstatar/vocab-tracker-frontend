import Link from "next/link";

interface PracticeSummaryProps {
  totalWords: number;
  rememberedCount: number;
}

export function PracticeSummary({ totalWords, rememberedCount }: PracticeSummaryProps) {
  return (
    <div className="w-full max-w-md bg-background border border-muted/20 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
        🎉
      </div>
      
      <div>
        <h2 className="text-3xl font-extrabold text-foreground">Session Completed!</h2>
        <p className="text-muted mt-2 text-sm">Great job reviewing your vocabulary today.</p>
      </div>

      <div className="bg-muted/5 border border-muted/10 rounded-2xl p-4 flex justify-around text-center">
        <div>
          <p className="text-xs text-muted font-medium">Total Words</p>
          <p className="text-2xl font-bold text-foreground mt-1">{totalWords}</p>
        </div>
        <div className="w-px bg-muted/10"></div>
        <div>
          <p className="text-xs text-muted font-medium">Remembered</p>
          <p className="text-2xl font-bold text-green-500 mt-1">{rememberedCount}</p>
        </div>
      </div>

      <div className="pt-2">
        <Link 
          href="/library" 
          className="block w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover shadow-lg transition-all"
        >
          Back to Library
        </Link>
      </div>
    </div>
  );
}