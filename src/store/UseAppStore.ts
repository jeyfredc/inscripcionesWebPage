import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, type UserSliceType } from './UserSlice';
import { createCourseSlice, type CourseSliceType } from './CourseSlice';
import { createStudentSlice, type StudentSliceType } from './StudentSlice';
import { createTeacherSlice, type TeacherSliceType } from './TeacherSlice';

type StoreState = UserSliceType & CourseSliceType & StudentSliceType & TeacherSliceType;

export const useAppStore = create<StoreState>()(
  devtools(
    (...a) => ({
      ...createUserSlice(...a),
      ...createCourseSlice(...a),
      ...createStudentSlice(...a),
      ...createTeacherSlice(...a),
    }),
    { name: 'app-store' }
  )
);

export type AppStore = ReturnType<typeof useAppStore.getState>;