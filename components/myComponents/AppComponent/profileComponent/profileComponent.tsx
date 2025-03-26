import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pen } from "lucide-react";
import Editor from "../../utilityComponent/editor";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "../../utilityComponent/logoutButton";
import { useSession } from "@/providers/sessionProvider";
import { CurrentUserType } from "../../utilityComponent/types";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";

const ProfileBioComponent = () => {

    const [selectMap, setSelectMap] = useState('');

    const handleSelect = (id: string) => {
        setSelectMap(id)
    };


    const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem()

    const currentUserBio = currentUser?.profile.bio
    const currentUserNickname = currentUser?.profile.nickname
    const currentUserPhoneNumber = currentUser?.profile.phoneNumber
    const currentUserName = currentUser?.name
    const currentUserProfilePic = currentUser?.image



    return (
        <div className=" space-y-[2rem]">
            {/* avatar */}
            <div className="w-full flex justify-start">

                <Avatar className="w-[7rem] h-[7rem]">
                    <AvatarImage src={currentUserProfilePic} alt="profilePic"/>
                    <AvatarFallback>YOU</AvatarFallback>
                </Avatar>
            </div>


            {/* bio */}
            <section className="w-full flex flex-col gap-[2rem]">

                {selectMap  !== "1" ? (
                    <div className="w-full flex items-center justify-between">
                        <div className="flex flex-col items-center justify-start">
                        <strong className="text-start w-full flex items-start justify-start">{currentUserNickname?.toWellFormed()}</strong>
                        <span className="font-thin text-xs">{`@${currentUserName?.toLocaleLowerCase()}`}</span>
                        </div>
                        <Pen className="w-5 h-5 cursor-pointer" onClick={()=>handleSelect("1")} />
                    </div>
                ) : (
                    <Editor  editorUse="Nickname" setSelectedState={setSelectMap} initialValue={currentUserNickname?.toWellFormed() as string} type={"text"}/>
                )}
                {selectMap  !== "2" ? (
                    <div className="w-full flex items-center justify-between">
                        <div className="flex flex-col justify-start">
                            
                            <span className="font-thin">About</span>
                            <p className="">{currentUserBio?.toWellFormed()}</p>
                        </div>
                        <Pen className="w-5 h-5 cursor-pointer" onClick={()=>handleSelect("2")} />
                            </div>
                ) : (
                    <Editor editorUse="Bio" setSelectedState={setSelectMap} initialValue={currentUserBio?.toWellFormed() as string} type={"text"}/>
                )}
                {selectMap  !== "3" ? (
                    <div className="w-full flex items-center justify-between">
                        <div className="flex flex-col justify-start">
                            
                            <span className="font-thin">Phone number</span>
                            <p className="">{currentUserPhoneNumber?.toWellFormed() || "No Phone"}</p>
                        </div>
                        <Pen className="w-5 h-5 cursor-pointer" onClick={()=>handleSelect("2")} />
                            </div>
                ) : (
                    <Editor editorUse=" PhoneNumber" setSelectedState={setSelectMap} initialValue={currentUserPhoneNumber?.toWellFormed() as string} type={"text"}/>
                )}

                <Separator/>

            </section>

            <LogoutButton/>


        </div>
    );
}
 
export default ProfileBioComponent;