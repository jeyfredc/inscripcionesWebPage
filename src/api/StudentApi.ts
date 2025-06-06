
import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ApiResponse } from "../types/api";



export async function getCredits(id:number) {
  try {
    const url = `Student/credits/${id}`;
    const { data } = await api.get<ApiResponse>(url);
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






