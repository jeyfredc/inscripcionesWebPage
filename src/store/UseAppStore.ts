import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createStoreSlice, StoreSliceType } from './StoreAppSlice';

type StoreState = StoreSliceType 

export const useAppStore = create<StoreState>()(
  devtools(
    (...a) => ({
      ...createStoreSlice(...a),
    }),
    { name: 'app-store' }
  )
);


export type AppStore = ReturnType<typeof useAppStore.getState>;