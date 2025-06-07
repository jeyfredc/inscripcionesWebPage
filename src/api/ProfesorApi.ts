
import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ApiResponse } from "../types/api";
import { RequestUnassignTeacher, TeacherResponse, TeacherResponseData } from "../types/Teacher";
import { CoursesInscriptionResponse } from "../types/Courses";

  

export async function getCourses(id:number):Promise<ApiResponse<TeacherResponseData[]>> {
  try {
    const url = `Teacher/assigned-courses/${id}`;
    const { data } = await api.get<ApiResponse<TeacherResponseData[]>>(url);
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

export async function PostUnassignTeacher(formTeacher:RequestUnassignTeacher):Promise<ApiResponse<CoursesInscriptionResponse>> {
  try {
    const url = `Teacher/unassign-teacher`;
    const { data } = await api.post<ApiResponse<CoursesInscriptionResponse>>(url,formTeacher);
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




