"use client";

import { ThemeSwitcher } from "@/components/settings/ThemeSwitcher";
import { useProfileSettings } from "@/hooks/useProfileSettings";

export function ProfileSettingsTab() {
    const { form, isFetching, onSubmit } = useProfileSettings();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    if (isFetching) {
        return (
            <div className="animate-pulse h-64 bg-foreground/5 rounded-2xl"></div>
        );
    }

    return (
        <div className="space-y-10 animate-fade-in">
            <section>
                <h2 className="text-xl font-bold mb-6 border-b border-foreground/10 pb-4">
                    Profile Information
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Display Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Guitar"
                            {...register("name")}
                            className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-transparent text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Daily Goal
                        </label>
                        <input
                            type="number"
                            min="1"
                            {...register("dailyGoal")}
                            className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-transparent text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                        <p className="text-sm text-muted mt-2">
                            Number of words you aim to review daily.
                        </p>
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all cursor-pointer disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-6 border-b border-foreground/10 pb-4">
                    Appearance
                </h2>
                <div className="space-y-4">
                    <label className="block text-sm font-medium mb-4">
                        Theme Preference
                    </label>
                    <ThemeSwitcher />
                </div>
            </section>
        </div>
    );
}
