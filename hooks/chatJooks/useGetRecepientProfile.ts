import getRecepientProfile from "@/actions/api-actions/chatActions/getRecepientProfile";
import { useQuery } from "@tanstack/react-query";

const useGetRecepientProfile = (recepientId:string) => {
    const {data, isLoading: isGettingRecepientProfile} = useQuery({
        queryKey: ["recepient-profile", {recepientId}],
        queryFn: ()=> getRecepientProfile(recepientId)
    })

    return {data, isGettingRecepientProfile};
}
 
export default useGetRecepientProfile;