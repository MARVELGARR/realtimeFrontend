import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";
type singleFileUploader = {
  message: string;
  url: string;
};
const useSingleFileUpload = () => {
  const { mutateAsync: upload, isPending: isUploading } = useMutation({
    mutationFn: (data: FormData) =>
      apiClient<singleFileUploader>("/singleFileUpload", {
        method: "POST",
        body: data,
        headers: "multipart/form-data"
      }),
  });
  return { upload, isUploading };
};

export default useSingleFileUpload;
