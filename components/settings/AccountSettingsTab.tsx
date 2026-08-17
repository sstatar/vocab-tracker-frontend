"use client";

import { useState } from "react";

export function AccountSettingsTab() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="space-y-10 animate-fade-in">
            <section>
                <h2 className="text-xl font-bold mb-6 border-b border-foreground/10 pb-4">
                    Change Password
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
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
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-transparent text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-transparent text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <button className="px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:opacity-90 transition-all cursor-pointer">
                            Update Password
                        </button>
                    </div>
                </div>
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
                    <button className="px-6 py-3 bg-transparent border-2 border-foreground/20 text-foreground rounded-xl font-bold hover:bg-foreground hover:text-background transition-all cursor-pointer">
                        Delete My Account
                    </button>
                </div>
            </section>
        </div>
    );
}
