import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type UseStoreUploadedUrls = {
  url: string
  setUrl: (url: string) => void
  clearUserSelections: () => void
}

export const useStoreUploadedUrls = create<UseStoreUploadedUrls>()((set) => ({
  url: "",
  setUrl: (urlString: string) =>
    set(() => ({
      url: urlString,
    })),
  clearUserSelections: () => set(() => ({ url: "" })),
}))

