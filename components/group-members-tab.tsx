"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Search, ExternalLink } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GroupProfileProps } from "@/actions/api-actions/chatActions/getGroupProfile";
import useDebounce from "@/hooks/utilityHooks/useDebounce";
import getGroupParticipant from "@/actions/api-actions/groupActions/getGroupParticipant";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ScrollArea } from "./ui/scroll-area";
import GroupParticipantItem from "@/app/(Application)/App/chat/_ChatComponents/groupParticipantItem'";

// Define the member type for better type safety
type Member = GroupProfileProps["participants"];

type GroupMembersTabProps = {
  Participants: GroupProfileProps["participants"];
};
export function GroupMembersTab({ Participants }: GroupMembersTabProps) {
  const urlQuery = new URLSearchParams(window.location.search);
  const conversationId = urlQuery.get("conversationId");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce(searchQuery, 500);
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fetch group participants with infinite scrolling
  const {
    data: groupParticipants,
    isLoading: isGettingParticipant,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["group-participant", { searchQuery, page: 1, limit: 10 }],
    queryFn: () => getGroupParticipant(debouncedValue,conversationId!, 1, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined,
  });

  const observerOptions = {
    root: containerRef.current,
    threshold: 0.5,
  };

  const onEndOverlap = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Set up intersection observer
  useEffect(() => {
    if (!endRef.current) return;
    observerRef.current = new IntersectionObserver(onEndOverlap, observerOptions);
    observerRef.current.observe(endRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, observerOptions]);


  const allParticipant = groupParticipants?.pages.flatMap((page) => page.participants) || [];

  return (
    <div className="flex flex-col h-full w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        {/* <h2 className="text-xl font-bold">Members ({members.length})</h2> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new member</DialogTitle>
              <DialogDescription>
                Enter the contact details of the person you want to add to this group.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add to group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search members"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4 flex-1 overflow-auto">
        <ScrollArea ref={containerRef} className="max-h-[30rem]">
          {allParticipant && allParticipant.length > 0 ? (
            allParticipant.map((member) => (
              <GroupParticipantItem key={member.id} member={member} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No members found</p>
            </div>
          )} 

          {/* /* Infinite Scroll Trigger */}
          <div ref={endRef} className="h-10"></div>

          {isFetchingNextPage && <p className="text-center py-4">Loading more...</p>}
        </ScrollArea>
      </div>
    </div>
  );
}
