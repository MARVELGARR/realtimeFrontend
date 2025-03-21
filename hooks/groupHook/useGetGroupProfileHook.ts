import getGroupProfile from "@/actions/api-actions/chatActions/getGroupProfile";
import { useQuery } from "@tanstack/react-query";

const useGetGroupProfile = (groupId:string) => {
    const {data, isLoading: isGettinggroupProfile} = useQuery({
        queryKey: ["group-profile", {groupId}],
        queryFn: ()=> getGroupProfile(groupId)
    })

    return {data, isGettinggroupProfile};
}
 
export default useGetGroupProfile;