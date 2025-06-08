import type { StateCreator } from "zustand";
import { getClassMatesById, getCoursesById, getCredits } from "../api/StudentApi";
import { ClassMate, ClassMatesResponse, CourseStudent, responseCourseByID } from "../types/Student";
import { getStoreUtils } from "./StoreUtils";

export type StudentSliceType = {
  creditStudent: number | null;
  isLoadingCredits: boolean;
  getCredits: (id: number) => Promise<void>;
  setCreditStudent: (credits: number | null) => void;
  studentId: number | null;
  classMatesStudents: ClassMate[];
  setClassMates: (classMates: ClassMate[]) => void;
}

export const createStudentSlice: StateCreator<
  StudentSliceType,
  [['zustand/devtools', never]],
  [],
  StudentSliceType
> = (set, get, api) => {
  const utils = getStoreUtils({ get, set, api });
  
  return {
    creditStudent: JSON.parse(localStorage.getItem('StudentData') || 'null')?.CreditosDisponibles,
    isLoadingCredits: false,
    studentId: JSON.parse(localStorage.getItem('StudentData') || 'null')?.EstudianteId,
    classMatesStudents: [], 

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
          localStorage.setItem('StudentData', JSON.stringify(response.Data));
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

    
    setClassMates: (classMates: ClassMate[]) => set({ classMatesStudents: classMates })
  }
}