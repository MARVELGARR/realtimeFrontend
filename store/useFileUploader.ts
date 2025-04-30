import {create} from 'zustand';

type useFileUploaderProp ={
    url: string | null;
    setUrl: (url: string | null) => void;
    image: string | null;
    setImage: (image: string | null) => void;
}


export const useFileUploader = create<useFileUploaderProp>((set)=>({
 url: null,
 setUrl: (url: string | null) => set({url}),
    image: null,
    setImage: (image: string | null) => set({image})
}))