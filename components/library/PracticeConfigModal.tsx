// src/components/library/PracticeConfigModal.tsx
"use client";

import { useRouter } from "next/navigation"; // 🌟 นำเข้า useRouter สำหรับเปลี่ยนหน้า

interface PracticeConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PracticeConfigModal({
    isOpen,
    onClose,
}: PracticeConfigModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    // ฟังก์ชันสำหรับเปลี่ยนหน้า พร้อมส่ง mode ไปที่ URL
    const handleSelectMode = (mode: string) => {
        onClose(); // ปิด Modal ก่อน
        router.push(`/practice?mode=${mode}`); // พาไปหน้า practice พร้อม mode
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
            <div className="bg-background w-full max-w-md rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-muted/20 relative animate-in fade-in zoom-in-95 duration-200">
                {/* ปุ่มปิด Modal */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-muted hover:text-danger transition-colors bg-muted/10 hover:bg-danger/10 p-2 rounded-full"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-primary mb-6">
                    Choose Practice Mode
                </h2>

                {/* ตัวเลือกโหมดการซ้อม (ทำเป็นปุ่มใหญ่ๆ เรียงกัน) */}
                <div className="space-y-3">
                    <button
                        onClick={() => handleSelectMode("needs_review")}
                        className="w-full text-left p-4 rounded-xl border-2 border-danger/20 hover:border-danger hover:bg-danger/5 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground group-hover:text-danger transition-colors">
                                    Needs Review
                                </h3>
                                <p className="text-sm text-muted">
                                    Focus on words you have trouble with
                                </p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => handleSelectMode("learning")}
                        className="w-full text-left p-4 rounded-xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                    Learning
                                </h3>
                                <p className="text-sm text-muted">
                                    Practice words you are currently studying
                                </p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => handleSelectMode("all")}
                        className="w-full text-left p-4 rounded-xl border-2 border-muted/20 hover:border-foreground/30 hover:bg-muted/5 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center text-foreground">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground transition-colors">
                                    Review All
                                </h3>
                                <p className="text-sm text-muted">
                                    Practice everything in your library
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
