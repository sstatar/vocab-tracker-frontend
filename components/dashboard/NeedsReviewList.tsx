import { Vocab } from "@/types";
import Link from "next/link";

interface NeedsReviewListProps {
    items: Vocab[];
}

export function NeedsReviewList({ items }: NeedsReviewListProps) {
    if (!items || items.length === 0) {
        return (
            <div className="bg-background border border-muted/10 rounded-[2rem] p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success"></span>
                        Needs Review
                    </h2>
                </div>
                <div className="text-center py-6 text-muted text-sm">
                    Great job! You have no words to review right now.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background border border-muted/10 rounded-[2rem] p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-danger"></span>
                    Needs Review
                </h2>
                <Link href="/practice?mode=needs_review">
                    <span className="text-xs text-primary font-medium cursor-pointer hover:underline">
                        View All
                    </span>
                </Link>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href="/practice?mode=needs_review"
                        className="flex items-center gap-4 group cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-danger/10 text-danger flex items-center justify-center font-bold group-hover:bg-danger group-hover:text-white transition-colors shrink-0">
                            {item.word.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm group-hover:text-primary transition-colors truncate">
                                {item.word}
                            </p>
                            <p className="text-xs text-muted truncate">
                                {item.meaning}
                            </p>
                        </div>

                        {item.mistakeCount && item.mistakeCount > 0 ? (
                            <div className="flex items-center gap-1 px-2 py-1 bg-danger/10 rounded-lg shrink-0">
                                <span className="text-[10px] font-bold text-danger">
                                    {item.mistakeCount}
                                </span>
                            </div>
                        ) : null}

                        {/* ไอคอนลูกศร */}
                        <div className="w-8 h-8 rounded-full border border-muted/20 flex items-center justify-center text-muted group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                            <svg
                                className="w-4 h-4"
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
                    </Link>
                ))}
            </div>
        </div>
    );
}
