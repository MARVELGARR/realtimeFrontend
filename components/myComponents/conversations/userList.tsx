import { User } from "@/actions/api-actions/userAction/getSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



const UserList = (data: {data: User}) => {
    
    const recepientId = data.data.id;
    const searchParams = new URLSearchParams(window.location.search);

    const handleClick = () => {
        searchParams.set("recipient", recepientId); // Set the recipient ID in search params
    };
    return (
        <div className="cursor-pointer" onClick={handleClick}>
            <div className="w-full flex place-items-start gap-3 ">
                <Avatar className="w-[2.7rem] h-[2.7rem]">
                    <AvatarImage src={data.data.image} alt={data.data.name} />
                    <AvatarFallback>{data.data.name?.slice(0,-1)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start -space-y-1">
                    <h3 className="font-bold">{data.data.name}</h3>
                    <p className="font-thin text-sm">{data.data.profile?.bio || data.data.profile?.phoneNumber}</p>
                </div>
            </div>
            <div className=""></div>
        </div>
    );
}
 
export default UserList;