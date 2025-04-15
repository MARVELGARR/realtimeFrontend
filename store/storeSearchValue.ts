import { create } from 'zustand';

interface StoreState {
    searchWord: string | "";
    setSearchWord: (word: string) => void;
}

const createStoreSearchWord = (initialValue?: string) =>
    create<StoreState>((set) => ({
        searchWord: initialValue ?? "",
        setSearchWord: (word) => set({ searchWord: word }),
    }));

export default createStoreSearchWord;