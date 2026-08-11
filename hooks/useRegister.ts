// src/hooks/useRegister.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth.service";

export function useRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      // เรียกใช้ Service ที่จัดการ URL ให้เราเรียบร้อยแล้ว
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err) { // 1. ลบ : any ออก (TypeScript จะมองมันเป็น unknown อัตโนมัติ)

      // 2. เช็กก่อนว่าสิ่งที่พังออกมา เป็นออบเจกต์ประเภท Error ใช่หรือไม่
      if (err instanceof Error) {
        setError(err.message); // ถ้าใช่ ถึงจะเรียกใช้ .message ได้ปลอดภัย
      } else {
        setError("An unexpected error occurred"); // เผื่อกรณีที่พังเป็นอย่างอื่น (เช่น พังเป็นข้อความเฉยๆ)
      }

    } finally {
      setIsLoading(false);
    }
  };

  return { formData, error, isLoading, handleChange, handleSubmit };
}