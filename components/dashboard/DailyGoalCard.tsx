import Link from "next/link";

interface DailyGoalCardProps {
    reviewed: number;
    target: number;
}

export function DailyGoalCard({ reviewed, target }: DailyGoalCardProps) {
    const progressPercent =
        target > 0 ? Math.round((reviewed / target) * 100) : 0;

    return (
        <div className="bg-primary rounded-[2rem] p-8 sm:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 right-20 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Daily Target
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        {reviewed} / {target}{" "}
                        <span className="text-2xl font-medium text-white/80">
                            Words
                        </span>
                    </h2>
                    <p className="text-white/80">
                        Keep going! You are almost there.
                    </p>
                </div>

                <div className="flex-shrink-0 bg-white/10 p-6 rounded-[2rem] backdrop-blur-md border border-white/20 text-center">
                    <span className="block text-3xl font-bold">
                        {progressPercent}%
                    </span>
                    <span className="text-sm text-white/70">Completed</span>
                    <Link href="/practice?mode=learning">
                        <button className="mt-4 w-full px-6 py-2 bg-white text-primary rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg cursor-pointer">
                            Review
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
