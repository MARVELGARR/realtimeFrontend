import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/store/useModalStore";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/clientApi";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useInView } from "react-intersection-observer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonStanding } from "lucide-react";
export interface UsersResponse {
    users: User[];
    totalCount: number;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    profile: UserProfile;
  }
  
  export interface UserProfile {
    profilePicture: string;
    blockedBy: string[]; // assuming these are user IDs
  }
  
const FindNewFriendModalCommand = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const me = "someValue";

  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "find-new-friend";

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const handleClose = () => {
    onClose();
  };

  const limit = 3;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["conversations", limit],
    queryFn: ({ pageParam = 0 }) =>
      apiClient<UsersResponse>("/users", {
        method: "GET",
        queryParams: {
          limit,
          searchTerm,
          offset: pageParam,
        },
        headers: "Application/Json",
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage?.totalCount;
      const nextOffset = allPages.length * limit;
      return nextOffset < totalItems ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" w-[25rem] h-[25rem] p-0 rounded">
        <Command>
          <CommandInput
            placeholder="Search for a user"
            onValueChange={(value) => setSearchTerm(value)}
          />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup heading="Users">
              {data?.pages?.map((page) =>
                page.users.map((user) => (
                  <CommandItem key={user.id} className="cursor-pointer hover:bg-cyan-500/70">
                    <Avatar>
                        <AvatarImage src={user.image || user.profile.profilePicture}/>
                        <AvatarFallback>
                            <PersonStanding/>
                        </AvatarFallback>
                    </Avatar>
                    <span className="">{user.name}</span>
                    <CiMenuKebab className="ml-auto"/>
                  </CommandItem>
                ))
              )}
              {hasNextPage && (
                <div
                  ref={ref}
                  className="text-center text-sm text-gray-500 py-2"
                >
                  Loading more...
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default FindNewFriendModalCommand;
