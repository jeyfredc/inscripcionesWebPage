import type { StateCreator } from "zustand";
import { AssignCourse, deleteCourses, getCoursesAvailable, getCourseWithoutAssign, PostCreateNewCourse, saveCourses } from "../api/CourseApi";
import type { 
  CorseDeleteData,
  CourseInscription, 
  CoursesAvailableData, 
  CoursesAvailableResponse, 
  CoursesInscriptionResponse, 
  CourseWithoutAssignData, 
  FormAssignCourse, 
  FormRegisterNewCourse, 
  ResponseCourseWithoutAssign
} from "../types/Courses";
import { CourseStudent } from "../types/Student";
import { getStoreUtils, type StoreUtils } from "./StoreUtils";

export interface CourseSliceType {
  availableCourses: CoursesAvailableData[];
  coursesAssigned: CourseStudent[];
  getCoursesAvailable: () => Promise<CoursesAvailableResponse>;
  inscriptionCourses: (courses: CourseInscription) => Promise<CoursesInscriptionResponse>;
  deleteCourses: (courses: CourseInscription) => Promise<CoursesInscriptionResponse>;
  newCourse: CourseWithoutAssignData[];
  getCourseWithoutAssign: () => Promise<ResponseCourseWithoutAssign>;
  assignCourseTeacher: (courses: FormAssignCourse) => Promise<CoursesInscriptionResponse>;
  saveNewCourse: (courses: FormRegisterNewCourse) => Promise<CoursesInscriptionResponse>;
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
  newCourse: [],
  
  getCoursesAvailable: async () => {
    return utils.withErrorHandling(async () => {
      const response = await getCoursesAvailable();
      
      if (response.Data) {
        set({ availableCourses: response.Data }, false, 'setAvailableCourses');
        utils.showAlert(false, response.Message);
      } else {
        set({ availableCourses: [] }, false, 'clearAvailableCourses');
        const errorMessage = response.Message || "Error al cargar los cursos";
        utils.showAlert(true, errorMessage);
      }
      
      const user = utils.getCurrentUser();
      if (user?.Rol === 'Estudiante' && user?.Id) {
        await utils.handleStudentCredits(user.Id);
      }
      
      return response;
    }, "Error al cargar los cursos");
  },
  
  inscriptionCourses: async (courses: CourseInscription) => {
    return utils.withErrorHandling(async () => {
      const response = await saveCourses(courses);
      
      if (response.Data) {
        utils.showAlert(false, response.Message);
      } else {
        utils.showAlert(true, response.Message || "Error al inscribir en los cursos");
      }
      
      const user = utils.getCurrentUser();
      if (user?.Rol === 'Estudiante' && user?.Id) {
        await utils.handleStudentCredits(user.Id);
        set({ availableCourses: [] }, false, 'clearAvailableCourses');
        const appStore = utils.getAppStore();
        await appStore.getCoursesAvailable?.();
      }
      
      return response;
    }, "Error al procesar la inscripción");
  },

  deleteCourses: async (courses: CorseDeleteData[]) => {
    return utils.withErrorHandling(async () => {
      const response = await deleteCourses(courses);
      
      if (response.Data) {
        utils.showAlert(false, response.Data.Message);
      } else {
        utils.showAlert(true, response.Data?.Message || "Error al eliminar los cursos");
      }
      
      const user = utils.getCurrentUser();
      if (user?.Rol === 'Estudiante' && user?.Id) {
        await utils.handleStudentCredits(user.Id);
        set({ coursesAssigned: [] }, false, 'clearCoursesAssigned');
        const studentId = localStorage.getItem('StudentId');
        const appStore = utils.getAppStore();
        if (appStore.getCoursesById && studentId) {
          await appStore.getCoursesById(Number(studentId));
        }
      }
      
      return response;
    }, "Error al eliminar los cursos");
  },
  
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
  };
}