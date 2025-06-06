import { authenticateUser, createAccount } from "../api/AuthApi";

import type { StateCreator } from "zustand";
import { toast } from "react-toastify";
import type { UserLoginForm, UserRegistrationForm, UserResponse, UserResponseData } from "../types/User";
import { AppStore } from "./UseAppStore";


export type UserSliceType = {
    authToken: string | null
    dataUser: UserResponseData | null
    createUser: (createUserForm: UserRegistrationForm) => Promise<void>
    loginUser: (loginUserForm: UserLoginForm) => Promise<UserResponse>
    successCreateUser: boolean
    isAuthenticated: boolean
    onLogout: () => void
    printAlert: (isError: boolean, message: string) => void
    resetSuccessCreateUser: () => void

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
  

export const createUserSlice: StateCreator<
    UserSliceType,
    [['zustand/devtools', never]],
    [],
    UserSliceType
> = (set, get, api) => {
    // No intentamos acceder a printAlert aquí

    return {
        dataUser: JSON.parse(localStorage.getItem('DATA_USER') || 'null'),
        authToken: localStorage.getItem('AUTH_TOKEN') || null,
        isAuthenticated: !!localStorage.getItem('AUTH_TOKEN'),
        successCreateUser: false,
        createUser: async (createUserForm: UserRegistrationForm) => {
            const response = await createAccount(createUserForm)


            if (response.Data === null) {
                get().printAlert(true, response.Errors[0])
                set({ successCreateUser: false })
            } else {
                get().printAlert(false, response.Message)
                set({ successCreateUser: true })
            }

        },
        loginUser: async (loginUserForm: UserLoginForm): Promise<UserResponse> => {
            const response = await authenticateUser(loginUserForm)
            console.log(response);

            if (response.Data === null) {
                get().printAlert(true, response.Errors[0])
                set({ successCreateUser: false })
                return response
            } else {
                get().printAlert(false, response.Message)
                set({ successCreateUser: true })
                set({ dataUser: response.Data })
                set({ authToken: response.Data.Token })
                set({ isAuthenticated: true })
                localStorage.setItem('AUTH_TOKEN', response.Data.Token)
                localStorage.setItem('DATA_USER', JSON.stringify(response.Data))
            const user = getCurrentUser();
            const store = get() as unknown as AppStore;
            
            if (user?.Rol === 'Estudiante' && user?.Id && store.getCredits) {
              await store.getCredits(user.Id);
            }
                return response
            }

        },
        onLogout: () => {
            set({ authToken: null })
            set({ isAuthenticated: false })
            localStorage.removeItem('AUTH_TOKEN')
        },
        printAlert: (isError, message) => {
            if (isError) {
                toast.error(message)
            } else {
                toast.success(message)
            }
        },
        resetSuccessCreateUser: () => {
            set({ successCreateUser: false })
        },

    }
}