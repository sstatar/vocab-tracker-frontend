import useSWR from "swr";
import { vocabService } from "@/lib/vocab.service";

export function useVocabStats() {
    const { data, error, isLoading, mutate } = useSWR(
        "/api/vocab/stats",
        vocabService.getVocabStats
    );

    return {
        stats: data,
        isLoading,
        error: error ? error.message : null,
        refetch: mutate
    };
}