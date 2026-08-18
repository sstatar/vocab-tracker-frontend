"use client";

import { useState } from "react";
import { EditVocabModal } from "./EditVocabModal";
import { type Vocab } from "@/types";
import { vocabService } from "@/lib/vocab.service";
import { useSWRConfig } from "swr";

interface VocabCardProps {
    vocab: Vocab;
}

export function VocabCard({ vocab }: VocabCardProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { mutate } = useSWRConfig();

    const handleMarkAsMastered = async () => {
        setIsUpdating(true);
        try {
            await vocabService.updateVocab(vocab.id, { status: "MASTERED" });
            mutate("/api/vocab");
        } catch (error) {
            alert("Failed to update status. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        const isConfirm = window.confirm(
            `Are you sure you want to delete the word "${vocab.word}"?`,
        );

        if (!isConfirm) return;

        setIsDeleting(true);
        try {
            await vocabService.deleteVocab(vocab.id);
            mutate("/api/vocab");
        } catch (error) {
            alert("Failed to delete word. Please try again.");
            setIsDeleting(false);
        }
    };

    let statusColor = "bg-blue-500";
    let displayStatus = "Learning";

    if (vocab.status === "MASTERED") {
        statusColor = "bg-green-500";
        displayStatus = "Mastered";
    } else if (vocab.status === "LEARNING" && (vocab.mistakeCount || 0) > 0) {
        statusColor = "bg-danger";
        displayStatus = "Needs Review";
    }

    return (
        <>
            <div className="bg-background border border-muted/20 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col justify-between min-h-[160px]">
                <div>
                    <div className="flex justify-between items-start mb-2 gap-3">
                        <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                            <h3 className="text-[18px] md:text-xl font-bold text-foreground wrap-break-words">
                                {vocab.word}
                            </h3>
                            <span className="text-xs font-medium text-muted italic">
                                {vocab.partOfSpeech}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-muted/5 px-2 py-1 rounded-md border border-muted/10 shrink-0">
                            <span
                                className={`w-1.5 h-1.5 rounded-full ${statusColor}`}
                            ></span>
                            <span className="text-[10px] font-medium text-muted whitespace-nowrap">
                                {/* 🌟 ใช้ตัวแปร displayStatus ที่เราคำนวณไว้ */}
                                {displayStatus}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-foreground/80 mb-3">
                        {vocab.meaning}
                    </p>

                    {vocab.example && (
                        <p className="text-xs text-muted italic line-clamp-2 border-l-2 border-muted/20 pl-2">
                            {vocab.example}
                        </p>
                    )}
                </div>

                <div className="mt-4 pt-3 border-t border-muted/10 flex justify-end gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    {vocab.status !== "MASTERED" && (
                        <button
                            onClick={handleMarkAsMastered}
                            disabled={isUpdating}
                            className="text-xs font-medium text-green-600 hover:underline transition-all disabled:opacity-50 disabled:no-underline"
                        >
                            {isUpdating ? "Updating..." : "Mark as Mastered"}
                        </button>
                    )}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="text-muted hover:text-primary transition-colors"
                            aria-label="Edit Word"
                        >
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
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={`transition-colors ${isDeleting ? "text-muted/50" : "text-muted hover:text-danger"}`}
                            aria-label="Delete Word"
                        >
                            <svg
                                className={`w-4 h-4 ${isDeleting ? "animate-pulse" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <EditVocabModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    vocab={vocab}
                />
            )}
        </>
    );
}
