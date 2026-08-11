"use client";

import { useState } from "react";
import { LibraryHeader } from "@/components/library/LibraryHeader";
import { LibraryTabs, type TabStatus } from "@/components/library/LibraryTabs";
import { VocabCard } from "@/components/library/VocabCard";
import { useVocabs } from "@/hooks/useVocabs";

export default function LibraryPage() {
    const { vocabs, isLoading, error } = useVocabs();

    const [activeTab, setActiveTab] = useState<TabStatus>("All Words");

    const filteredVocabs = vocabs.filter((vocab) => {
        if (activeTab === "All Words") return true;
        
        // 🌟 Trick: แปลงชื่อ Tab เช่น "Needs Review" ให้กลายเป็น "NEEDS_REVIEW" เพื่อให้ตรงกับใน Database
        const formattedTab = activeTab.toUpperCase().replace(" ", "_");
        return vocab.status === formattedTab; 
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
            <LibraryHeader />

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
                            {/* เปลี่ยน UI เป็นภาษาอังกฤษทั้งหมด */}
                            <p className="text-xl">No words found in this category.</p>
                            
                            {/* แถม: ถ้าอยู่หน้า All Words แล้วไม่มีคำศัพท์เลย ให้แนะนำผู้ใช้สักนิด */}
                            {activeTab === "All Words" && (
                                <p className="mt-2 text-sm">Click &quot;Add New Word&quot; to get started!</p>
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
    );
}