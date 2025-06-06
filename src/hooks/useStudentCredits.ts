import { useCallback } from 'react';
import { useAppStore } from '../store/UseAppStore';

export const useStudentCredits = () => {
  const { getCredits, dataUser } = useAppStore();

  const fetchCredits = useCallback(async (): Promise<void> => {
    if (dataUser?.Rol !== 'Estudiante' || !dataUser?.Id) {
      return;
    }
    
    try {
      await getCredits(dataUser.Id);
    } catch (error) {
      console.error('Error al obtener créditos:', error);
      throw error; // Re-throw to allow error handling in the component
    }
  }, [dataUser, getCredits]);

  return { fetchCredits };
};