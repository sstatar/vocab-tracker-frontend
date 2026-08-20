export interface UpdateProfileData {
  name?: string;
  dailyGoal?: number;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const userService = {
  getProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch profile");
    return response.json();
  },

  updateProfile: async (data: UpdateProfileData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update profile");
    return response.json();
  },

  changePassword: async (data: ChangePasswordData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_URL}/users/me/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to change password");
    }
    return response.json();
  },

  deleteAccount: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_URL}/users/me`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || "Failed to delete account");
    }

    return response.json();
  },
};