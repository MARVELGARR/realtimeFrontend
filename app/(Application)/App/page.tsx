'use client'
import getOauthUser from "@/actions/server-actions/getOauthUser";
import { useQuery } from "@tanstack/react-query";

const App = () => {


    const {data, isLoading, error} = useQuery({
        queryKey: ["oauthUser"],
        queryFn: getOauthUser, 
    })
    if(isLoading){
        return (
            <div className=""></div>
        )
    }
    return (
        <>
        {JSON.stringify(data)}
        </>
    );
}
 
export default App;