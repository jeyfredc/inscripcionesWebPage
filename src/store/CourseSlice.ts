import type { StateCreator } from "zustand";
import { AssignCourse, deleteCourses, deleteSubjectByCodeId, GetCoursesAndSchedules, getCoursesAvailable, getCourseWithoutAssign, PostCreateNewCourse, saveCourses, updateSubjectByCodeId } from "../api/CourseApi";
import type { 
  CorseDeleteData,
  CourseInscription, 
  CoursesAndSchedules, 
  CoursesAndSchedulesData, 
  CoursesAvailableData, 
  CoursesAvailableResponse, 
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
  getCoursesAvailable: () => Promise<CoursesAvailableResponse>;
  inscriptionCourses: (courses: CourseInscription) => Promise<CoursesInscriptionResponse>;
  deleteCourses: (courses: CourseInscription) => Promise<CoursesInscriptionResponse>;
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
      const appStore = utils.getAppStore();
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
        const studentId = localStorage.getItem('Id_Estudiante');
        console.log(studentId);
        
        if (appStore.getCoursesById && studentId) {
          await appStore.getCoursesById(Number(studentId));
          await appStore.getCoursesAvailable?.();
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