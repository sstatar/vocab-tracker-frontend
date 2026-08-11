"use client"; // ยังต้องมีอยู่นะครับ เพราะ Custom Hook ของเราใช้ State อยู่เบื้องหลัง

import Link from "next/link";
import { useRegister } from "@/hooks/useRegister"; // ดึง Custom Hook เข้ามา

export default function RegisterPage() {
    // บรรทัดพระเอก! ดึงทุกอย่างที่ต้องใช้จาก Hook มาเตรียมไว้
    const { formData, error, isLoading, handleChange, handleSubmit } =
        useRegister();

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
            <div className="w-full max-w-md p-8 space-y-6 bg-background border border-muted/20 rounded-2xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary">
                        Create Account
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        Start tracking your vocabulary today
                    </p>
                </div>

                {/* ถ้ามี Error ก็เอาตัวแปร error มาโชว์ตรงนี้ */}
                {error && (
                    <div className="p-3 text-sm text-danger bg-danger/10 border border-danger/20 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {/* ผูก handleSubmit เข้ากับฟอร์ม */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name} // ดึงค่าจาก state
                            onChange={handleChange} // ส่ง action ไปให้ hook จัดการ
                            placeholder="John Doe"
                            className="w-full px-4 py-2 border border-muted/30 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            required
                        />
                    </div>

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
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-muted/30 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading} // ถ้า Hook บอกว่ากำลังโหลด ก็ปิดปุ่มไป
                        className="w-full py-2.5 mt-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-muted">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-primary hover:underline font-medium"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
