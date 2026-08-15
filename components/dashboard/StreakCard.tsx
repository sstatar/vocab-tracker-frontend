import Link from "next/link";

interface StreakCardProps {
    streak: number;
}

export function StreakCard({ streak }: StreakCardProps) {
    return (
        <Link href="/practice" className="block w-full">
            <div className="bg-orange-500 rounded-[2rem] p-6 shadow-lg text-white relative overflow-hidden flex items-center justify-between hover:bg-orange-600 transition-colors cursor-pointer cursor-pointer">
                <div className="relative z-10">
                    <p className="text-white/80 font-medium mb-1">
                        Current Streak
                    </p>
                    <p className="text-4xl font-bold">
                        {streak}{" "}
                        <span className="text-lg font-normal">Days 🔥</span>
                    </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
            </div>
        </Link>
    );
}
