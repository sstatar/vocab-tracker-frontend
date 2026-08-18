"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { Flashcard } from "@/components/practice/Flashcard";
import { PracticeSummary } from "@/components/practice/PracticeSummary";
import { type Vocab } from "@/types";
import { vocabService } from "@/lib/vocab.service";

interface PracticeSessionProps {
    vocabs: Vocab[];
    mode: string;
}

export function PracticeSession({ vocabs, mode }: PracticeSessionProps) {
    const router = useRouter();

    const [practiceWords] = useState<Vocab[]>(() => {
        let filtered = vocabs;

        if (mode === "needs_review") {
            filtered = vocabs.filter(
                (v) => v.status === "LEARNING" && (v.mistakeCount || 0) > 0,
            );
        } else if (mode === "learning") {
            filtered = vocabs.filter((v) => v.status === "LEARNING");
        }

        return [...filtered].sort(() => Math.random() - 0.5).slice(0, 20);
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [rememberedCount, setRememberedCount] = useState(0);

    if (practiceWords.length === 0) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    No words found!
                </h2>
                <p className="text-muted mb-8">
                    You don&apos;t have any words in the &quot;
                    {mode.replace("_", " ")}&quot; category yet.
                </p>
                <button
                    onClick={() => router.push("/library")}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                    Go back to Library
                </button>
            </div>
        );
    }

    const currentWord = practiceWords[currentIndex];

    const handleNextWord = async (gotIt: boolean) => {
        if (gotIt) setRememberedCount((prev) => prev + 1);

        const statusToUpdate = gotIt ? "MASTERED" : "LEARNING";
        const isMistake = !gotIt;

        try {
            await vocabService.reviewVocab(
                currentWord.id,
                statusToUpdate,
                isMistake,
            );
        } catch (error) {
            console.error("Failed to review vocabulary:", error);
        }

        if (currentIndex + 1 < practiceWords.length) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setIsCompleted(true);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between max-w-4xl mx-auto px-4 py-8">
            <PracticeHeader
                currentIndex={currentIndex}
                totalWords={practiceWords.length}
                isCompleted={isCompleted}
            />

            <div className="flex-1 flex items-center justify-center py-8">
                {!isCompleted ? (
                    <Flashcard
                        key={currentWord.id}
                        wordData={currentWord}
                        onResult={handleNextWord}
                    />
                ) : (
                    <PracticeSummary
                        totalWords={practiceWords.length}
                        rememberedCount={rememberedCount}
                    />
                )}
            </div>

            <div className="text-center text-xs text-muted">
                {!isCompleted &&
                    "Tip: Be honest with yourself! Clicking 'Forgot' will schedule the word for sooner review."}
            </div>
        </div>
    );
}
