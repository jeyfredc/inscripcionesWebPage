
import { isAxiosError } from "axios";
import api from "../lib/axios";
import type { UserLoginForm, UserRegistrationForm } from "../types/User";
export interface ApiResponse<T = any> {
    Data: T | null;
    Success: boolean;
    Message: string;
    Errors: string[];
}
export async function createAccount(formData: UserRegistrationForm): Promise<ApiResponse> {
    try {
        const url = "auth/register";
        const { data } = await api.post<ApiResponse>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response) {
                return error.response.data;
            }
            return {
                Data: null,
                Success: false,
                Message: 'No se pudo conectar con el servidor',
                Errors: ['Error de conexión'],
            };
        }
        return {
            Data: null,
            Success: false,
            Message: 'Error inesperado',
            Errors: ['Ocurrió un error inesperado'],
        };
    }
}


export async function authenticateUser(formData: UserLoginForm) {
  try {
    const url = "auth/login";
    const { data } = await api.post<string>(url, formData);
    localStorage.setItem('AUTH_TOKEN', data)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
  }
}






