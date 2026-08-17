import { useForm } from "react-hook-form";
import useSWR from "swr";
import { userService, UpdateProfileData } from "@/lib/user.service";

export function useProfileSettings() {
    const { data: profile, isLoading: isFetching, mutate } = useSWR(
        "profile",
        userService.getProfile
    );

    const form = useForm<UpdateProfileData>({
        values: profile,
    });

    const onSubmit = async (data: UpdateProfileData) => {
        try {
            const payload = {
                name: data.name,
                dailyGoal: Number(data.dailyGoal),
            };

            await userService.updateProfile(payload);

            mutate({ ...profile, ...payload }, false);

            alert("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update profile");
            console.error(error);
        }
    };

    return {
        form,
        isFetching,
        onSubmit
    };
}