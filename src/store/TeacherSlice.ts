
import type { StateCreator } from "zustand";
import { getCourses } from "../api/ProfesorApi";
import { ApiResponse } from "../types/api";
import { TeacherResponseData } from "../types/Teacher";


export type TeacherSliceType = {
    coursesByTeacher: TeacherResponseData[]
    getCoursesByTeacher: (id: number) => Promise<ApiResponse<TeacherResponseData[]>>
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
            return response
    }

})