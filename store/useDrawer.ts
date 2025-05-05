import { create } from "zustand";

type DrawerType = "settings" | null;

export interface DrawerState {
  isOpen: boolean;
  type: DrawerType | null;
  openDrawer: (type: DrawerType) => void;
  closeDrawer: () => void;
}

export const useDrawer = create<DrawerState>((set) => ({
  isOpen: false,
  type: null,
  openDrawer: (type: DrawerType) => set({ isOpen: true, type }),
  closeDrawer: () => set({ isOpen: false, type: null }),
}));
