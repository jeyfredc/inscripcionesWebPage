// src/store/StudentSlice.ts
import type { StateCreator } from "zustand";
import { getCredits } from "../api/StudentApi";

export type StudentSliceType = {
  creditStudent: number | null;
  isLoadingCredits: boolean;
  getCredits: (id: number) => Promise<void>;
  setCreditStudent: (credits: number | null) => void;
}

export const createStudentSlice: StateCreator<StudentSliceType> = (set) => ({
  creditStudent: null,
  isLoadingCredits: false,
  
  getCredits: async (id: number) => {
    set({ isLoadingCredits: true });
    try {
      const response = await getCredits(id);
      if (response?.Data) {
        set({ creditStudent: response.Data.CreditosDisponibles });
      } else {
        set({ creditStudent: null });
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
      set({ creditStudent: null });
    } finally {
      set({ isLoadingCredits: false });
    }
  },
  
  setCreditStudent: (credits) => set({ creditStudent: credits })
});