'use client'
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import clearAllChat from "@/actions/api-actions/userAction/clearAllChat";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@/providers/sessionProvider";
import { CurrentUserType } from "../../utilityComponent/types";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";

const ProfileChatComponent = () => {


  const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem()
    const currentUserId = currentUser?.id

    const handleClear = async () =>{
        await clearAllChat(currentUserId as string).then((data)=>{
            toast({
                title: "Data cleared",
                description: `${data.message}`,
                variant: "success",
                duration: 500
            })
        }).catch((error)=>{
            toast({
                title: "Data not cleared",
                description: `${error.error}`,
                variant: "destructive",
                duration: 500
            })
        })
    }
    
  return (
    <div className=" mt-3 flex  flex-col space-y-4 justify-start">
      <strong className="">Chats</strong>

      <p className="">Chat history</p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>Clear chat history</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileChatComponent;
