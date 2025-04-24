import getFavourite from "@/actions/api-actions/chatActions/getFavourite";
import { useQuery } from "@tanstack/react-query";

const useGetFavourite = () => {

    const {data: favourite, isLoading: isGettingFavourite} = useQuery({
        queryKey: ["favourites"],
        queryFn: ()=>getFavourite()
    })
    return {favourite, isGettingFavourite};
}
 
export default useGetFavourite;