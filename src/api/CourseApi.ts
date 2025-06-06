
import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CorseDeleteData, CourseInscription, CourseInscriptionDelete, CoursesAvailableResponse, CoursesInscriptionData, CoursesInscriptionDeleteResponse, CoursesInscriptionResponse, FormAssignCourse, ResponseCourseWithoutAssign } from "../types/Courses";




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

export async function deleteCourses(courses: CorseDeleteData[]) {
  try {
    const url = `Courses/remove-course`;
    const { data } = await api.delete<CoursesInscriptionDeleteResponse>(url, {data:courses});
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

export async function getCourseWithoutAssign() {
    try {
        const url = `Courses/unassigned-courses`;
        const { data } = await api.get<ResponseCourseWithoutAssign>(url);
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

export async function AssignCourse(FormAssignCourse: FormAssignCourse) {
  try {
      const url = `Courses/assign-course-teacher`;
      const { data } = await api.post<CoursesInscriptionResponse>(url, FormAssignCourse);
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


