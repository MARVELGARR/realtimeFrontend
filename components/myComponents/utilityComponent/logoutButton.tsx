'use client'
import logout from "@/actions/api-actions/authActions/logout";
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const LogoutButton = () => {

    const router = useRouter()
    

    const onLogout = async()=>{
         logout().then((data)=>{
            toast({
                title: "Logged out",
                description: `${data.message}`,
                variant: "success",
                duration: 5000
            })
            router.push('/login')
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