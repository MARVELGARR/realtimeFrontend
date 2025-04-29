import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";

const useSingleFileUpload = () => {
    const {mutateAsync: upload, isPending: isUploading} = useMutation({
        mutationFn: (data: FormData)=> apiClient("/v1/singleFileUpload", {
            method: "POST",
            body: data
        })
    })
    return {upload, isUploading};
}
 
export default useSingleFileUpload;