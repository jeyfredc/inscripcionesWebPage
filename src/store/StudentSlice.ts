import type { StateCreator } from "zustand";
import { getCoursesById, getCredits } from "../api/StudentApi";
import { CourseStudent, responseCourseByID } from "../types/Student";
import { getStoreUtils } from "./StoreUtils";

export type StudentSliceType = {
  creditStudent: number | null;
  isLoadingCredits: boolean;
  getCredits: (id: number) => Promise<void>;
  setCreditStudent: (credits: number | null) => void;
  studentId: number | null;
  getCoursesById: (id: number) => Promise<responseCourseByID>;
  coursesAssigned: CourseStudent[];
}

export const createStudentSlice: StateCreator<
  StudentSliceType,
  [['zustand/devtools', never]],
  [],
  StudentSliceType
> = (set, get, api) => {
  const utils = getStoreUtils({ get, set, api });
  
  return {
    creditStudent: null,
    isLoadingCredits: false,
    studentId: JSON.parse(localStorage.getItem('StudentId') || 'null'),

    coursesAssigned: [],

    getCredits: async (id: number) => {
      set({ isLoadingCredits: true });
      try {
        const response = await utils.withErrorHandling(
          () => getCredits(id),
          'Error al cargar los créditos'
        );
        
        if (response?.Data) {
          set({ 
            creditStudent: response.Data.CreditosDisponibles,
            studentId: response.Data.EstudianteId
          });
          localStorage.setItem('StudentId', response.Data.EstudianteId.toString());
        } else {
          set({ creditStudent: null });
          utils.showAlert(true, 'No se pudieron cargar los créditos');
        }
        return response;
      } finally {
        set({ isLoadingCredits: false });
      }
    },

    setCreditStudent: (credits) => set({ creditStudent: credits }),
    getCoursesById: async (id: number) => {
      const response = await utils.withErrorHandling(
        () => getCoursesById(id),
        'Error al cargar los cursos'
      );
      
      set({ coursesAssigned: response.Data });
      utils.showAlert(false, response.Message);
      return response;
    }
  }
}