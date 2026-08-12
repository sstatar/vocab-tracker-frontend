"use client";

import { useState } from "react";
import { LibraryHeader } from "@/components/library/LibraryHeader";
import { LibraryTabs, type TabStatus } from "@/components/library/LibraryTabs";
import { VocabCard } from "@/components/library/VocabCard";
import { useVocabs } from "@/hooks/useVocabs";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function LibraryPage() {
    const { vocabs, isLoading, error } = useVocabs();
    const [activeTab, setActiveTab] = useState<TabStatus>("All Words");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredVocabs = vocabs.filter((vocab) => {
        // 1. Filter by active tab
        const formattedTab = activeTab.toUpperCase().replace(" ", "_");
        const matchesTab =
            activeTab === "All Words" || vocab.status === formattedTab;

        // 2. Filter by search query (case-insensitive)
        if (!searchQuery.trim()) return matchesTab;

        const query = searchQuery.toLowerCase();
        const matchesSearch =
            vocab.word.toLowerCase().includes(query) ||
            vocab.meaning.toLowerCase().includes(query);

        return matchesTab && matchesSearch;
    });

    return (
        <ProtectedRoute>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
                <LibraryHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <LibraryTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                )}

                {error && (
                    <div className="p-4 text-center text-danger bg-danger/10 rounded-lg border border-danger/20">
                        <p>Error: {error}</p>
                    </div>
                )}

                {!isLoading && !error && (
                    <>
                        {filteredVocabs.length === 0 ? (
                            <div className="text-center py-20 text-muted">
                                <p className="text-xl">
                                    {/* Dynamic empty state message */}
                                    {searchQuery
                                        ? `No results found for "${searchQuery}"`
                                        : "No words found in this category."}
                                </p>

                                {/* Onboarding hint for new users */}
                                {activeTab === "All Words" && !searchQuery && (
                                    <p className="mt-2 text-sm">
                                        Click &quot;Add New Word&quot; to get
                                        started!
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredVocabs.map((vocab) => (
                                    <VocabCard key={vocab.id} vocab={vocab} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </ProtectedRoute>
    );
}
