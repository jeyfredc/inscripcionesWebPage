
import type { StateCreator } from "zustand";
import { getCourses } from "../api/ProfesorApi";


export type TeacherSliceType = {
    coursesByTeacher: any[]
    getCoursesByTeacher: (id:number) => Promise<void>
}

export const createTeacherSlice: StateCreator<TeacherSliceType> = (set, get) => ({
    coursesByTeacher: [],
    getCoursesByTeacher: async (id:number) => {
        const response = await getCourses(id)
        console.log(response);
            if(response.Data){
                set({coursesByTeacher: response.Data})
            }else{
                set({coursesByTeacher: []})
            }
    }

})