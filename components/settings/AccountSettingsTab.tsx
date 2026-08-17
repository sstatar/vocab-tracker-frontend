"use client";

import { useAccountSettings } from "@/hooks/useAccountSettings";

export function AccountSettingsTab() {
    const {
        form,
        apiError,
        success,
        isDeleting,
        onSubmit,
        handleDeleteAccount,
    } = useAccountSettings();

    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting, errors },
    } = form;

    return (
        <div className="space-y-10 animate-fade-in">
            <section>
                <h2 className="text-xl font-bold mb-6 border-b border-foreground/10 pb-4">
                    Change Password
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {apiError && (
                        <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-sm font-medium">
                            {apiError}
                        </div>
                    )}
                    {success && (
                        <div className="p-4 bg-green-500/10 text-green-500 rounded-xl text-sm font-medium">
                            {success}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            {...register("oldPassword", { required: true })}
                            className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-transparent text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                {...register("newPassword", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                                className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-transparent text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.newPassword.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (val) => {
                                        if (watch("newPassword") != val) {
                                            return "Your passwords do not match";
                                        }
                                    },
                                })}
                                className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-transparent text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
                        >
                            {isSubmitting ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-6 border-b border-foreground/10 pb-4">
                    Delete Account
                </h2>
                <div className="p-6 bg-foreground/5 border border-foreground/10 rounded-2xl">
                    <p className="text-muted mb-6 text-sm">
                        Permanently remove your account and all associated
                        vocabulary data. This action cannot be undone.
                    </p>
                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="px-6 py-3 bg-transparent border-2 border-red-500/50 text-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                    >
                        {isDeleting ? "Deleting..." : "Delete My Account"}
                    </button>
                </div>
            </section>
        </div>
    );
}
