import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, type UserSliceType } from './UserSlice';
import { createCourseSlice, type CourseSliceType } from './CourseSlice';
import { createStudentSlice, StudentSliceType } from './StudentSlice';
import { createTeacherSlice, type TeacherSliceType } from './TeacherSlice';

// Definir el tipo base para el store
type StoreState = UserSliceType & CourseSliceType & StudentSliceType & TeacherSliceType;

// Crear el store con los tipos correctos
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

// Exportar el tipo del store completo
export type AppStore = ReturnType<typeof useAppStore.getState>;