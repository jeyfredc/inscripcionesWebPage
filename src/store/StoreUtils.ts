import { StoreApi } from 'zustand';
import { AppStore } from './UseAppStore';

type StoreWithUtils = {
  get: StoreApi<unknown>['getState'];
  set: StoreApi<unknown>['setState'];
  api: any;
};

export const getStoreUtils = ({ get, set, api }: StoreWithUtils) => {
  const getAppStore = (): AppStore => {
    return api.getState() as unknown as AppStore;
  };

  const showAlert = (isError: boolean, message: string): void => {
    const appStore = getAppStore();
    appStore.printAlert?.(isError, message);
  };

  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem('DATA_USER');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const handleApiError = (error: unknown, defaultMessage: string): never => {
    console.error(error);
    showAlert(true, defaultMessage);
    throw error;
  };

  const handleStudentCredits = async (userId: number): Promise<void> => {
    const appStore = getAppStore();
    if (appStore.getCredits) {
      await appStore.getCredits(userId);
    }
  };

  const withErrorHandling = async <T>(
    fn: () => Promise<T>,
    errorMessage: string
  ): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      return handleApiError(error, errorMessage) as never;
    }
  };

  return {
    showAlert,
    getCurrentUser,
    handleApiError,
    handleStudentCredits,
    getAppStore,
    withErrorHandling,
  };
};

export type StoreUtils = ReturnType<typeof getStoreUtils>;