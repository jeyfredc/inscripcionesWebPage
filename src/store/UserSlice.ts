import { authenticateUser, createAccount } from "../api/AuthApi";

import type { StateCreator } from "zustand";
import { toast } from "react-toastify";
import type { UserLoginForm, UserRegistrationForm, UserResponse, UserResponseData } from "../types/User";
import { AppStore } from "./UseAppStore";


export type UserSliceType = {
    authToken: string | null
    dataUser: UserResponseData | null
    loginUser: (loginUserForm: UserLoginForm) => Promise<UserResponse>
    isAuthenticated: boolean
    onLogout: () => void
    printAlert: (isError: boolean, message: string) => void

}

export const createUserSlice: StateCreator<
    UserSliceType,
    [['zustand/devtools', never]],
    [],
    UserSliceType
> = (set, get, api) => {


    return {
        dataUser: JSON.parse(localStorage.getItem('DATA_USER') || 'null'),
        authToken: localStorage.getItem('AUTH_TOKEN') || null,
        isAuthenticated: !!localStorage.getItem('AUTH_TOKEN'),
        loginUser: async (loginUserForm: UserLoginForm): Promise<UserResponse> => {
            const response = await authenticateUser(loginUserForm)

            if (response.Data !== null) {
                set({ dataUser: response.Data })
                set({ authToken: response.Data.Token })
                set({ isAuthenticated: true })
                localStorage.setItem('AUTH_TOKEN', response.Data.Token)
                localStorage.setItem('DATA_USER', JSON.stringify(response.Data))
                const store = get() as unknown as AppStore;

                if (response.Data?.Rol === 'Estudiante' && response.Data?.Id) {
                    await store.getCredits(response.Data.Id);
                }
                return response
            }
            return response
        },
        onLogout: () => {
            set({ authToken: null })
            set({ isAuthenticated: false })
            localStorage.removeItem('AUTH_TOKEN')
            localStorage.removeItem('DATA_USER')
            localStorage.removeItem('StudentId')
            localStorage.removeItem('Id_Profesor')
        },
        printAlert: (isError, message) => {
            if (isError) {
                toast.error(message)
            } else {
                toast.success(message)
            }
        },

    }
}