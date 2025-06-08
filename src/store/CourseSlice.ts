import type { StateCreator } from "zustand";
import { AssignCourse, deleteSubjectByCodeId, GetCoursesAndSchedules, getCourseWithoutAssign, PostCreateNewCourse, updateSubjectByCodeId } from "../api/CourseApi";
import type { 
  CoursesAndSchedules, 
  CoursesAndSchedulesData, 
  CoursesAvailableData, 
  CoursesInscriptionResponse, 
  CourseWithoutAssignData, 
  FormAssignCourse, 
  FormRegisterNewCourse, 
  FormUpdateSubject, 
  ResponseCourseWithoutAssign
} from "../types/Courses";
import { CourseStudent } from "../types/Student";
import { getStoreUtils, type StoreUtils } from "./StoreUtils";

export interface CourseSliceType {
  availableCourses: CoursesAvailableData[];
  coursesAssigned: CourseStudent[];
  coursesAndSchedules: CoursesAndSchedulesData[];
  newCourse: CourseWithoutAssignData[];
  getCourseWithoutAssign: () => Promise<ResponseCourseWithoutAssign>;
  assignCourseTeacher: (courses: FormAssignCourse) => Promise<CoursesInscriptionResponse>;
  saveNewCourse: (courses: FormRegisterNewCourse) => Promise<CoursesInscriptionResponse>;
  getCoursesAndSchedules: () => Promise<CoursesAndSchedules>;
  deleteSubject: (subject: FormAssignCourse['CodigoMateria']) => Promise<CoursesInscriptionResponse>;
  updateSubject: (subject: FormUpdateSubject) => Promise<CoursesInscriptionResponse>;
}



export const createCourseSlice: StateCreator<
  CourseSliceType,
  [['zustand/devtools', never]],
  [],
  CourseSliceType
> = (set, get, api) => {
  const utils = getStoreUtils({ get, set, api });
  
  return {
  availableCourses: [],
  coursesAssigned: [],
  coursesAndSchedules: [],
  newCourse: [],

  
  getCourseWithoutAssign: async () => {
    return utils.withErrorHandling(async () => {
      const response = await getCourseWithoutAssign();
      
      if (response.Data) {
        set({ newCourse: response.Data }, false, 'setNewCourse');
        utils.showAlert(false, response.Message);
      } else {
        set({ newCourse: [] }, false, 'clearNewCourse');
        const errorMessage = response.Message || "Error al cargar los cursos sin asignar";
        utils.showAlert(true, errorMessage);
      }
      
      return response;
    }, "Error al cargar los cursos sin asignar");
  },

  assignCourseTeacher: async (courses: FormAssignCourse) => {
    return utils.withErrorHandling(async () => {
      const response = await AssignCourse(courses);
      
      if (response.Data) {
        utils.showAlert(false, response.Message);
      } else {
        utils.showAlert(true, response.Message || "Error al asignar los cursos");
      }
     
      return response;
    }, "Error al asignar los cursos");
  },
  saveNewCourse: async (courses: FormRegisterNewCourse) => {
    return utils.withErrorHandling(async () => {
      const response = await PostCreateNewCourse(courses);
      
      if (response.Data) {
        utils.showAlert(false, response.Message);
      } else {
        utils.showAlert(true, response.Message || "Error al crear la nueva materia");
      }
     
      return response;
    }, "Error al crear la nueva materia");
  },
  getCoursesAndSchedules: async () => {
    return utils.withErrorHandling(async () => {
      const response = await GetCoursesAndSchedules();
      
      if (response.Data) {
        set({ coursesAndSchedules: response.Data }, false, 'setCoursesAndSchedules');
        utils.showAlert(false, response.Message);
      } else {
        set({ coursesAndSchedules: [] }, false, 'clearCoursesAndSchedules');
        const errorMessage = response.Message || "Error al cargar los cursos y horarios";
        utils.showAlert(true, errorMessage);
      }
      
      return response;
    }, "Error al cargar los cursos y horarios");
  },
  deleteSubject: async (subject: FormAssignCourse['CodigoMateria']) => {
    return utils.withErrorHandling(async () => {
      const response = await deleteSubjectByCodeId(subject);
      
      if (response.Data) {
        utils.showAlert(false, response.Message);
        get().getCoursesAndSchedules();
      } else {
        utils.showAlert(true, response.Message || "Error al eliminar la materia");
      }
     
      return response;
    }, "Error al eliminar la materia");
  },
  updateSubject: async (subject: FormUpdateSubject) => {
    return utils.withErrorHandling(async () => {
      const response = await updateSubjectByCodeId(subject);
      
      if (response.Data) {
        utils.showAlert(false, response.Message);
        get().getCoursesAndSchedules();
      } else {
        utils.showAlert(true, response.Message || "Error al actualizar la materia");
      }
     
      return response;
    }, "Error al actualizar la materia");
  },
  };
}