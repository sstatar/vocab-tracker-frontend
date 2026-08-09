interface StatCardsProps {
  totalVocab: number;
  mastered: number;
  learning: number;
}

export function StatCards({ totalVocab, mastered, learning }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
      <div className="bg-background rounded-[2rem] p-6 pt-10 shadow-lg border border-muted/10 relative flex flex-col items-center text-center">
        <div className="absolute -top-8 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl transform -rotate-3 hover:rotate-0 transition-transform">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <h3 className="text-sm font-bold text-muted mb-1">Total Words</h3>
        <p className="text-3xl font-extrabold text-primary">{totalVocab}</p>
        <div className="w-full bg-muted/10 rounded-full h-1.5 mt-4"><div className="bg-primary h-1.5 rounded-full w-full"></div></div>
      </div>

      <div className="bg-background rounded-[2rem] p-6 pt-10 shadow-lg border border-muted/10 relative flex flex-col items-center text-center">
        <div className="absolute -top-8 w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 className="text-sm font-bold text-muted mb-1">Mastered</h3>
        <p className="text-3xl font-extrabold text-green-500">{mastered}</p>
        <div className="w-full bg-muted/10 rounded-full h-1.5 mt-4"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }}></div></div>
      </div>

      <div className="bg-background rounded-[2rem] p-6 pt-10 shadow-lg border border-muted/10 relative flex flex-col items-center text-center">
        <div className="absolute -top-8 w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl transform -rotate-3 hover:rotate-0 transition-transform">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h3 className="text-sm font-bold text-muted mb-1">Learning</h3>
        <p className="text-3xl font-extrabold text-blue-500">{learning}</p>
        <div className="w-full bg-muted/10 rounded-full h-1.5 mt-4"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '55%' }}></div></div>
      </div>
    </div>
  );
}