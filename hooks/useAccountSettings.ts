import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { userService, ChangePasswordData } from "@/lib/user.service";

export interface AccountFormValues extends ChangePasswordData {
    confirmPassword: string;
}

export function useAccountSettings() {
    const router = useRouter();

    const [apiError, setApiError] = useState("");
    const [success, setSuccess] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<AccountFormValues>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (data: AccountFormValues) => {
        setApiError("");
        setSuccess("");

        try {
            await userService.changePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            });

            setSuccess("Password updated successfully!");
            form.reset();
        } catch (err) {
            if (err instanceof Error) {
                setApiError(err.message);
            } else {
                setApiError("Failed to update password");
            }
        }
    };

    const handleDeleteAccount = async () => {
        const isConfirmed = window.confirm(
            "Are you absolutely sure you want to delete your account? This action cannot be undone and all your vocabulary data will be lost."
        );

        if (!isConfirmed) return;

        try {
            setIsDeleting(true);
            await userService.deleteAccount();

            localStorage.removeItem("token");
            alert("Your account has been deleted.");
            router.push("/login");
        } catch (err) { // 🌟 เอา : any ออก
            // 🌟 เช็ก Type ให้ถูกต้องตามหลัก TypeScript
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Failed to delete account");
            }
            setIsDeleting(false);
        }
    };

    return {
        form,
        apiError,
        success,
        isDeleting,
        onSubmit,
        handleDeleteAccount
    };
}