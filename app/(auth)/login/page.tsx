"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
    // ดึงทุกอย่างมาจาก Custom Hook
    const { formData, error, isLoading, handleChange, handleSubmit } =
        useLogin();

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
            <div className="w-full max-w-md p-8 space-y-6 bg-background border border-muted/20 rounded-2xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        Sign in to continue tracking your progress
                    </p>
                </div>

                {/* แสดง Error */}
                {error && (
                    <div className="p-3 text-sm text-danger bg-danger/10 border border-danger/20 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-muted/30 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-muted/30 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 mt-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-sm text-muted">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-primary hover:underline font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
