// src/hooks/useVocabs.ts
import useSWR from "swr";
import { type Vocab } from "@/types";
import { vocabService } from "@/lib/vocab.service";
import { useAuth } from "@/hooks/useAuth";

export function useVocabs() {
    const { isAuthenticated } = useAuth();
    const { data, error, isLoading, mutate } = useSWR<Vocab[]>(
        isAuthenticated ? "/api/vocab" : null,
        vocabService.getAllVocabs
    );

    return {
        vocabs: data || [],
        isLoading,
        error: error ? error.message : null,
        refetch: mutate
    };
}