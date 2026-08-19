"use client";

import { useAddVocab } from "@/hooks/useAddVocab";
import { createPortal } from "react-dom";

interface AddVocabModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddVocabModal({ isOpen, onClose }: AddVocabModalProps) {
    const {
        formData,
        isLoading,
        error,
        handleChange,
        handleSubmit,
        handleCancel,
    } = useAddVocab(onClose);

    if (!isOpen) return null;

    if (typeof document === "undefined") return null;

    const modalContent = (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
            <div className="bg-background w-full max-w-md rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-muted/20 relative animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={handleCancel}
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
                    Add New Word
                </h2>

                {error && (
                    <div className="mb-4 p-3 text-sm text-danger bg-danger/10 border border-danger/20 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">
                            Vocabulary <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            name="word"
                            value={formData.word}
                            onChange={handleChange}
                            placeholder="e.g., Abundant"
                            className="w-full px-4 py-3 bg-muted/5 border border-muted/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-1">
                                Meaning <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="meaning"
                                value={formData.meaning}
                                onChange={handleChange}
                                placeholder="e.g., มากมาย"
                                className="w-full px-4 py-3 bg-muted/5 border border-muted/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted mb-1">
                                Part of Speech
                            </label>
                            <select
                                name="partOfSpeech"
                                value={formData.partOfSpeech}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-background border border-muted/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                            >
                                <option value="n.">Noun (n.)</option>
                                <option value="v.">Verb (v.)</option>
                                <option value="adj.">Adjective (adj.)</option>
                                <option value="adv.">Adverb (adv.)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">
                            Example Sentence (Optional)
                        </label>
                        <textarea
                            name="example"
                            value={formData.example}
                            onChange={handleChange}
                            placeholder="The country has an abundant supply of natural gas."
                            rows={3}
                            className="w-full px-4 py-3 bg-muted/5 border border-muted/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-foreground"
                        ></textarea>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-muted/10 text-muted font-bold rounded-xl hover:bg-muted/20 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg transition-all disabled:opacity-50 flex justify-center items-center"
                        >
                            {isLoading ? "Saving..." : "Save Word"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
