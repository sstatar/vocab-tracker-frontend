"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ui/ThemeToggle";
import { useState } from "react"; // 1. นำเข้า useState

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const isAuthPage = pathname === "/login" || pathname === "/register";

    // 2. สร้าง State สำหรับจดจำว่าเมนูมือถือเปิดอยู่หรือไม่
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        router.push("/login");
    };

    return (
        <nav className="border-b border-muted/20 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* 1. Logo (Always visible) */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="text-xl font-bold text-primary hover:text-primary-hover transition-colors"
                        >
                            VocabTracker
                        </Link>
                    </div>

                    {/* 2. Center Menu & Right Side Tools */}
                    {!isAuthPage && (
                        <>
                            {/* เมนูตรงกลาง (แสดงเฉพาะจอคอม) */}
                            <div className="hidden md:flex space-x-8">
                                <Link href="/" className="text-muted hover:text-primary transition-colors font-medium">
                                    Dashboard
                                </Link>
                                <Link href="/library" className="text-muted hover:text-primary transition-colors font-medium">
                                    Vocab Library
                                </Link>
                            </div>

                            {/* เครื่องมือด้านขวา */}
                            <div className="flex items-center space-x-2 md:space-x-4">
                                {/* ปุ่มเปลี่ยนสี (แสดงตลอดเวลา) */}
                                <ThemeToggle />

                                {/* ปุ่ม Logout (แสดงเฉพาะจอคอม) */}
                                <button
                                    onClick={handleLogout}
                                    className="hidden md:block bg-danger text-white px-4 py-2 rounded-lg hover:bg-danger-hover transition-colors text-sm font-medium"
                                >
                                    Logout
                                </button>

                                {/* 3. ปุ่ม Hamburger (แสดงเฉพาะมือถือ) */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)} // สลับสถานะเปิด/ปิด
                                    className="md:hidden p-2 rounded-md text-muted hover:text-primary hover:bg-muted/10 transition-colors"
                                    aria-label="Toggle Menu"
                                >
                                    {/* ใช้ SVG วาดเส้น 3 ขีด หรือกากบาท ขึ้นอยู่กับสถานะ */}
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {isMenuOpen ? (
                                            // ไอคอนกากบาท (ปิด)
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            // ไอคอน 3 ขีด (เปิด)
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* 4. Dropdown Menu สำหรับมือถือ (แสดงเมื่อ isMenuOpen เป็น true) */}
            {!isAuthPage && isMenuOpen && (
                <div className="md:hidden border-t border-muted/20 bg-background px-4 pt-2 pb-4 space-y-2 shadow-lg">
                    <Link
                        href="/dashboard"
                        onClick={() => setIsMenuOpen(false)} // กดแล้วให้ปิดเมนูอัตโนมัติ
                        className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-primary hover:bg-muted/10 transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/library"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-primary hover:bg-muted/10 transition-colors"
                    >
                        Vocab Library
                    </Link>
                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            handleLogout();
                        }}
                        className="w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-danger hover:bg-danger/10 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}