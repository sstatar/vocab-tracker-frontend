import axios from 'axios';

// สร้าง Instance ของ Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: ดักจับก่อนส่ง Request (แนบ Token)
api.interceptors.request.use(
  (config) => {
    // ดึง Token จาก Local Storage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: ดักจับตอนรับ Response (จัดการ 401 Token หมดอายุ)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ถ้า Token หมดอายุ หรือไม่มีสิทธิ์ ให้เคลียร์ข้อมูลแล้วเด้งไปหน้า Login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;