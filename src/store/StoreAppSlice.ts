import { StateCreator } from "zustand";
import { ClassMate } from "../types/Student";
import { getCredits } from "../api/StudentApi";
import { toast } from "react-toastify";
import { UserLoginForm, UserResponse, UserResponseData } from "../types/User";
import { authenticateUser } from "../api/AuthApi";


export type StoreSliceType = {
    creditStudent: number;
    getCredits: (id: number) => Promise<void>;
    setCreditStudent: (credits: number) => void;
    studentId: number;
    classMatesStudents: ClassMate[];
    setClassMates: (classMates: ClassMate[]) => void;
    authToken: string | null;
    dataUser: UserResponseData
    loginUser: (loginUserForm: UserLoginForm) => Promise<UserResponse>
    isAuthenticated: boolean
    onLogout: () => void
}

export const createStoreSlice: StateCreator<
    StoreSliceType,
    [['zustand/devtools', never]],
    [],
    StoreSliceType
> = (set, get, api) => {


    return {
        dataUser: JSON.parse(localStorage.getItem('DATA_USER') || 'null'),
        authToken: localStorage.getItem('AUTH_TOKEN') || null,
        isAuthenticated: !!localStorage.getItem('AUTH_TOKEN'),
        creditStudent: JSON.parse(localStorage.getItem('StudentData') || 'null')?.CreditosDisponibles,
        studentId: JSON.parse(localStorage.getItem('StudentData') || 'null')?.EstudianteId,
        classMatesStudents: [],
        loginUser: async (loginUserForm: UserLoginForm): Promise<UserResponse> => {
            const response = await authenticateUser(loginUserForm)

            if (response.Data !== null) {
                set({ dataUser: response.Data })
                set({ authToken: response.Data.Token })
                set({ isAuthenticated: true })
                localStorage.setItem('AUTH_TOKEN', response.Data.Token)
                localStorage.setItem('DATA_USER', JSON.stringify(response.Data))

                if (response.Data?.Rol === 'Estudiante' && response.Data?.Id) {
                    await get().getCredits(response.Data.Id);
                }
                return response
            }
            return response
        },
        onLogout: () => {
            set({ authToken: '' })
            set({ isAuthenticated: false })
            localStorage.removeItem('AUTH_TOKEN')
            localStorage.removeItem('DATA_USER')
            localStorage.removeItem('StudentId')
            localStorage.removeItem('Id_Profesor')
        },

        getCredits: async (id: number) => {

            try {
                const response = await getCredits(id);

                if (response?.Data) {
                    set({
                        creditStudent: response.Data.CreditosDisponibles,
                        studentId: response.Data.EstudianteId
                    });
                    localStorage.setItem('StudentData', JSON.stringify(response.Data));
                } else {
                    set({ creditStudent: 0 });
                    toast.error('No se pudieron cargar los créditos');
                }
                return response;
            } catch (error) {
                toast.error('No se pudieron cargar los créditos');
            }
        },

        setCreditStudent: (credits) => set({ creditStudent: credits }),


        setClassMates: (classMates: ClassMate[]) => set({ classMatesStudents: classMates })
    }
}