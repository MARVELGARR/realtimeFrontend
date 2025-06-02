import { create } from "zustand";

type DrawerType = "settings" | "groupSettings" | null;
type data = {}

export interface DrawerState {
  isOpen: boolean;
  type: DrawerType | null;
  data?:data | null;
  openDrawer: (type: DrawerType, data?: data) => void;
  closeDrawer: () => void;
}

export const useDrawer = create<DrawerState>((set) => ({
  isOpen: false,
  type: null,
  data: null,
  openDrawer: (type: DrawerType, data?: data) => set({ isOpen: true, type, data }),
  closeDrawer: () => set({ isOpen: false, type: null }),
}));
