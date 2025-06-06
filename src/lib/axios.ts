// src/lib/axios.ts
import axios from "axios";
import { useAppStore } from "../store/UseAppStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Interceptor de petición
api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const setupResponseInterceptors = () => {
    const onLogout = useAppStore.getState().onLogout;

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                const { data, status } = error.response;
                
                if (status === 401 && data?.error === 'TokenExpired') {
                    onLogout();

                }
            }
            return Promise.reject(error);
        }
    );
};
setupResponseInterceptors();

export default api;