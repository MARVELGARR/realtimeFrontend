'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import SearchBar from "@/CustomComponent/utilityComponent/searchBar";
import { useAddGroupMembersSelection } from "@/store/addGroupMembersSelection";
import { apiClient } from "@/utils/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";



type Friend = {
  id: string;
  name: string;
  email: string;
  image: string;
  profile: {
    profilePicture: string;
  };
};
export type FriendsToAdd = {
  friends: Friend[];
  totalCount: number;
};
const AddFriendToGroup = () => {


    const [searchTerm, setSearchTerm] =  useState('')
  const limit = 5;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    isFetched, 
    

  } = useInfiniteQuery({
    queryKey: ["friends"],
    queryFn: ({ pageParam = 0 }) =>
      apiClient<FriendsToAdd>("/friends", {
        method: "GET",
        queryParams: {
          limit,
          offset: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage?.totalCount;
      const nextOffset = allPages.length * limit;
      return nextOffset < totalItems ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });


  const friends = data?.pages.flatMap((frnd)=>frnd.friends)

  const {selections,removeSelections, setSelections} =useAddGroupMembersSelection()

  return (
    <div className="">
        <SearchBar className="" value={searchTerm} placeholder="search friends..." onChange={(value: string) => setSearchTerm(value)} />
        <div className="">
            <ul className="flex flex-col gap-2">
                {friends?.map((frnd)=>{
                    return (
                        <li className=" w-full  py-3 flex items-center justify-between pr-3 hover:bg-cyan-500">
                            <div className="flex items-center gap-3">

                                <Avatar className="h-[2.5rem] w-[2.5rem]">
                                    <AvatarImage src={frnd.image || frnd.profile.profilePicture} alt={frnd.name}/>
                                    <AvatarFallback>{frnd.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <p className="">{frnd.name}</p>
                            </div>
                            <div className="">
                                <Checkbox
      id={frnd.id}
      checked={selections?.includes(frnd.id)}
      onCheckedChange={(checked) =>
        checked ? setSelections(frnd.id) : removeSelections(frnd.id)
      }
    />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>

    </div>
  );
};

export default AddFriendToGroup;
