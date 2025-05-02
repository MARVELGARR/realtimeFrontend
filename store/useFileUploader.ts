import {create} from 'zustand';
import { singleFileUploaderFor } from './useModalStore';


type useFileUploaderProp ={
    url: string | null;
    fileFor: singleFileUploaderFor | null;
    setUrl: (url: string | null, fileFor: singleFileUploaderFor | null) => void;
    image: string | null;
    setImage: (image: string | null) => void;
}


export const useFileUploader = create<useFileUploaderProp>((set)=>({
 url: null,
 fileFor: null,
 setUrl: (url: string | null, fileFor: singleFileUploaderFor | null) => set({url, fileFor}),
    image: null,
    setImage: (image: string | null) => set({image})
}))