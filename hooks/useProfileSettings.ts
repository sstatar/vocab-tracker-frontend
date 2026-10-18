import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "@/hooks/useProfile";
import { userService, UpdateProfileData } from "@/lib/user.service";

export function useProfileSettings() {
    const { profile, isLoading: isFetching, refetch } = useProfile();

    const form = useForm<UpdateProfileData>();
    const { reset, formState: { isDirty, isSubmitting } } = form;

    useEffect(() => {
        // Background refreshes must not replace an unsaved draft.
        if (profile && !isDirty && !isSubmitting) {
            reset({
                name: profile.name ?? "",
                dailyGoal: profile.dailyGoal,
            });
        }
    }, [profile, isDirty, isSubmitting, reset]);

    const onSubmit = async (data: UpdateProfileData) => {
        try {
            const payload = {
                name: data.name,
                dailyGoal: Number(data.dailyGoal),
            };

            await userService.updateProfile(payload);

        } catch (error) {
            alert("Failed to update profile");
            console.error(error);
            return;
        }

        // Saving and refreshing are separate operations: a failed GET does not undo the save.
        try {
            const latest = await refetch();
            if (!latest) throw new Error("No refreshed profile returned");
            reset({ name: latest.name ?? "", dailyGoal: latest.dailyGoal });
            alert("Profile updated successfully!");
        } catch (error) {
            alert("Profile saved, but refreshing failed. Your draft has been kept; please reload to see the saved data.");
            console.error(error);
        }
    };

    return {
        form,
        isFetching,
        onSubmit
    };
}
