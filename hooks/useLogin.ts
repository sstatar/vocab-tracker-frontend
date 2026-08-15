import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth.service"; // ปรับ path ให้ตรงกับโฟลเดอร์ของคุณนะครับ

export function useLogin() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. ส่งข้อมูลไป Login
      const data = await authService.login(formData);

      // 2. ถ้าสำเร็จ Backend จะส่ง token กลับมา ให้เราเซฟเก็บไว้ในเครื่อง
      localStorage.setItem("token", data.token);

      // 3. พาผู้ใช้ไปหน้า Dashboard แบบหล่อๆ
      router.push("/");

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, error, isLoading, handleChange, handleSubmit };
}