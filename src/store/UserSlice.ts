import { createAccount } from "../api/AuthApi";
import type { UserRegistrationForm } from "../types/UserRegistrationForm";
import type { StateCreator } from "zustand";
import { toast } from "react-toastify";


export type UserSliceType = {
    // token: string | null
    createUser: (createUserForm:UserRegistrationForm) => Promise<void>
    successCreateUser: boolean
    isAuthenticated: boolean
    onLogout: () => void
    printAlert: (isError: boolean, message: string) => void
    resetSuccessCreateUser: () => void
    
}
/* console.log(localStorage.getItem('user'));
*/
export const createUserSlice: StateCreator<UserSliceType> = (set, get) => ({
    // token: null,
    successCreateUser: false,
    createUser: async (createUserForm:UserRegistrationForm) => {
        const response = await createAccount(createUserForm)


        if(response.Data===null){
            get().printAlert(true, response.Errors[0])
            set({successCreateUser: false})
        }else{
            get().printAlert(false, response.Message)
            set({successCreateUser: true})
        }

    },
    isAuthenticated: false,
    onLogout: () => {
        /* set({token: null}) */
    },
    printAlert: (isError, message) => {
        if (isError) {
            toast.error(message)
        } else {
            toast.success(message)
        }
    },
    resetSuccessCreateUser: () => {
        set({successCreateUser: false})
    }
})