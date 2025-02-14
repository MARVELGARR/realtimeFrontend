'use client'
import logout from "@/actions/api-actions/authActions/logout";
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast";
import Cookies from "cookies-js"


const LogoutButton = () => {
    

    const onLogout = async()=>{
         logout().then((data)=>{
            toast({
                title: "Logged out",
                description: `${data.message}`,
                variant: "success",
                duration: 5000
            })
         }).catch((error)=>{
            toast({
                title: "Error Logged out",
                description: `${error.error}`,
                variant: "destructive",
                duration: 5000
            })
         })
    }

    return (
        <Button variant={'destructive'} className="" onClick={onLogout}>
            Logout
        </Button>
    );
}
 
export default LogoutButton;