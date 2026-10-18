import useSWR from "swr";
import { vocabService } from "@/lib/vocab.service";
import { useAuth } from "@/hooks/useAuth";

export function useVocabStats() {
    const { isAuthenticated } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        isAuthenticated ? "/api/vocab/stats" : null,
        vocabService.getVocabStats
    );

    return {
        stats: data,
        isLoading,
        error: error ? error.message : null,
        refetch: mutate
    };
}