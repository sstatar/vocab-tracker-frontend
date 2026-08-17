"use client";

import { useState } from "react";
import {
    SettingsSidebar,
    TabType,
} from "@/components/settings/SettingsSidebar";
import { ProfileSettingsTab } from "@/components/settings/ProfileSettingsTab";
import { AccountSettingsTab } from "@/components/settings/AccountSettingsTab";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabType>("profile");

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-8 animate-fade-in-up text-foreground">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted mt-2">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Component 1: เมนูด้านซ้าย */}
                <SettingsSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {/* Component 2: เนื้อหาด้านขวา */}
                <div className="flex-1 p-8 rounded-[2rem] border border-foreground/10 bg-background shadow-lg">
                    {activeTab === "profile" && <ProfileSettingsTab />}
                    {activeTab === "account" && <AccountSettingsTab />}
                </div>
            </div>
        </div>
    );
}
