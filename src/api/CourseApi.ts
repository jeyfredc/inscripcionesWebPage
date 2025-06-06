
import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CourseInscription, CoursesAvailableResponse, CoursesInscriptionResponse } from "../types/Courses";




export async function getCoursesAvailable() {
  try {
    const url = `Courses/available-courses`;
    const { data } = await api.get<CoursesAvailableResponse>(url);
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

export async function saveCourses( courses: CourseInscription ) {
  try {
    const url = `Courses/inscription-course`;
    const { data } = await api.post<CoursesInscriptionResponse>(url, courses);
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




