import { User } from '@/actions/api-actions/userAction/getCurrentUser';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
};

// Define the store with the persist middleware
const useStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData: User) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // The key under which the data will be saved in localStorage
      // Ensure it's using `localStorage` for persistence
    }
  )
);

export default useStore;
