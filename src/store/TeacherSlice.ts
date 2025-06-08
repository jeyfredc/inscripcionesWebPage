
import type { StateCreator } from "zustand";
import { getCourses,     PostUnassignTeacher } from "../api/ProfesorApi";
import { ApiResponse } from "../types/api";
import { RequestUnassignTeacher, TeacherResponseData } from "../types/Teacher";
import { CoursesInscriptionResponse } from "../types/Courses";
import { getStoreUtils } from "./StoreUtils";


export type TeacherSliceType = {
    coursesByTeacher: TeacherResponseData[]
    getCoursesByTeacher: (id: number) => Promise<ApiResponse<TeacherResponseData[]>>
    postUnassignTeacher: (formTeacher:RequestUnassignTeacher) => Promise<ApiResponse<CoursesInscriptionResponse>>
}

export const createTeacherSlice: StateCreator<
  TeacherSliceType,
  [['zustand/devtools', never]],
  [],
  TeacherSliceType
> = (set, get, api) => {
  const utils = getStoreUtils({ get, set, api });
  return {
    coursesByTeacher: [],
    getCoursesByTeacher: async (id:number) => {
        const response = await getCourses(id)
            if(response.Data){
                set({coursesByTeacher: response.Data})
            }else{
                set({coursesByTeacher: []})
            }
            return response
    },
    postUnassignTeacher: async (formTeacher:RequestUnassignTeacher) => {
        const response = await PostUnassignTeacher(formTeacher)
        if(response.Data?.Success){
            utils.showAlert(false, response.Message)
            utils.getAppStore().getCoursesAndSchedules()
        }else{
            utils.showAlert(true, response.Message)
        }
        
        return response
    }

}}