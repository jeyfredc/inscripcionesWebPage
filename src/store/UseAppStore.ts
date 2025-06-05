import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, type UserSliceType } from './UserSlice';
import { createTeacherSlice, type TeacherSliceType } from './TeacherSlice';




export const useAppStore = create<UserSliceType & TeacherSliceType>()(devtools((...a)=> ({
    ...createUserSlice(...a),
    ...createTeacherSlice(...a),

})))