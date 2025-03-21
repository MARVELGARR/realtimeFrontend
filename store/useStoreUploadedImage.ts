import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type UrlProps = {
  url: string
  name: string
}

type UseStoreUploadedUrls = {
  urls: UrlProps[] | null
  setUrls: (url: UrlProps) => void
  clearUserSelections: () => void
}

export const useStoreUploadedUrls = create<UseStoreUploadedUrls>()(
  persist(
    (set) => ({
      urls: null,
      setUrls: (urlObject: UrlProps) =>
        set((state) => ({
          urls: Array.from(new Set([...(state.urls || []), urlObject])),
        })),
      clearUserSelections: () => set(() => ({ urls: [] })),
    }),
    {
      name: "uploaded-urls-storage", // unique name for the localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage engine
      partialize: (state) => ({ urls: state.urls }), // only persist the urls field
    },
  ),
)

