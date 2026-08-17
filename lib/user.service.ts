// src/lib/user.service.ts
export interface UpdateProfileData {
  name?: string;
  dailyGoal?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const userService = {
  updateProfile: async (data: UpdateProfileData) => {
    // 1. ดึง Token จากเครื่องผู้ใช้
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // 2. ยิง API ไปที่ Backend (ใช้พอร์ต 8000 ตามที่คุณตั้งไว้ในไฟล์ index.ts)
    const response = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // แปลง Object ที่ส่งเข้ามาให้เป็น JSON
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    return response.json();
  },
};