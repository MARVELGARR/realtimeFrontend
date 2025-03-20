import singlefileUpload from "@/actions/api-actions/authActions/fileUploadActions/singleFileUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSingleFileUploadHook = () => {

    const queryClient = useQueryClient()

    const {mutateAsync: UploadFile, isPending: isUploadingFile } = useMutation({
        mutationFn: (data: FormData)=> singlefileUpload(data),
        onSettled: ()=>{

        }
    })
    return {UploadFile, isUploadingFile};
}
 
export default useSingleFileUploadHook;