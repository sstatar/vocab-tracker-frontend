import useSWR from "swr";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/lib/user.service";

export function useProfile() {
    const { isAuthenticated } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        isAuthenticated ? "profile" : null,
        userService.getProfile,
        { errorRetryCount: 3 }
    );

    return {
        profile: data,
        isLoading,
        error: error ? error.message : null,
        refetch: mutate,
    };
}
