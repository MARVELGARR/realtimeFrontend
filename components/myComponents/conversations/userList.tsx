"use client";

import { User } from "@/actions/api-actions/userAction/getSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const UserList = ({ data }: { data: User }) => {
    const initialRecepientId = data.id;
    const [recepientId, setRecepientId] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const existingId = params.get("recepientId");
        if (existingId) {
            setRecepientId(existingId);
        }
    }, []);

    const handleClick = () => {
        const params = new URLSearchParams(window.location.search);
        params.set("recepientId", initialRecepientId);
        window.history.replaceState({}, "", `?${params.toString()}`);
        setRecepientId(initialRecepientId);
    };

    return (
        <div className="cursor-pointer" onClick={handleClick}>
            <div className="w-full flex place-items-start gap-3">
                <Avatar className="w-[2.7rem] h-[2.7rem]">
                    <AvatarImage src={data.image} alt={data.name} />
                    <AvatarFallback>{data.name?.slice(0, -1)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start -space-y-1">
                    <h3 className="font-bold">{data.name}</h3>
                    <p className="font-thin text-sm">
                        {data.profile?.bio || data.profile?.phoneNumber}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserList;
