import type { StateCreator } from "zustand";
import { getCoursesAvailable, saveCourses } from "../api/CourseApi";
import type { 
  CourseInscription, 
  CoursesAvailableData, 
  CoursesAvailableResponse, 
  CoursesInscriptionResponse 
} from "../types/Courses";
import type { AppStore } from "./UseAppStore";

export interface CourseSliceType {
  availableCourses: CoursesAvailableData[];
  getCoursesAvailable: () => Promise<CoursesAvailableResponse>;
  inscriptionCourses: (courses: CourseInscription) => Promise<CoursesInscriptionResponse>;
}

const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('DATA_USER');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const createCourseSlice: StateCreator<
  CourseSliceType,
  [['zustand/devtools', never]],
  [],
  CourseSliceType
> = (set, get, api) => ({
  availableCourses: [],
  
  getCoursesAvailable: async () => {
    try {
      const response = await getCoursesAvailable();
      const printAlert = (api.getState() as unknown as AppStore).printAlert;
      
      if (response.Data) {
        set({ availableCourses: response.Data }, false, 'setAvailableCourses');
        printAlert?.(false, response.Message);
      } else {
        set({ availableCourses: [] }, false, 'clearAvailableCourses');
        const errorMessage = response.Message || "Error al cargar los cursos";
        printAlert?.(true, errorMessage);
      }
            // Refresh credits if user is a student
            const user = getCurrentUser();
            const store = get() as unknown as AppStore;
            
            if (user?.Rol === 'Estudiante' && user?.Id && store.getCredits) {
              await store.getCredits(user.Id);
            }
      return response;
      
    } catch (error) {
      console.error("Error in getCoursesAvailable:", error);
      const printAlert = (api.getState() as unknown as AppStore).printAlert;
      printAlert?.(true, "Error al cargar los cursos");
      throw error;
    }
  },
  
  inscriptionCourses: async (courses: CourseInscription) => {
    try {
      const response = await saveCourses(courses);
      const printAlert = (api.getState() as unknown as AppStore).printAlert;
      
      if (response.Data) {
        printAlert?.(false, response.Message);
      } else {
        printAlert?.(true, response.Message || "Error al inscribir en los cursos");
      }
      
      // Refresh credits if user is a student
      const user = getCurrentUser();
      const store = get() as unknown as AppStore;
      
      if (user?.Rol === 'Estudiante' && user?.Id && store.getCredits) {
        await store.getCredits(user.Id);
      }
      
      return response;
    } catch (error) {
      console.error("Error in inscriptionCourses:", error);
      const printAlert = (api.getState() as unknown as AppStore).printAlert;
      printAlert?.(true, "Error al procesar la inscripción");
      throw error;
    }
  },
});