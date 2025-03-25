"use client"

import { useState, useEffect, useRef } from "react"
import getSearchUsers, { type UserSearchResponse } from "@/actions/api-actions/userAction/getSearchUsers"
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar"
import useDebounce from "@/hooks/utilityHooks/useDebounce"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface NewChatSearchProps {
  onUserSelect?: (user: any) => void
}

const NewChatSearch = ({onUserSelect }: NewChatSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedValue = useDebounce(searchQuery, 500)
  const containerRef = useRef<HTMLDivElement>(null)

  

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ["users", debouncedValue],
    queryFn: ({ pageParam }) => getSearchUsers(debouncedValue, String(pageParam), "1"),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.currentPage + 1
      }
      return undefined
    },
  })

  // Handle intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.5 },
    )

    const currentContainer = containerRef.current
    if (currentContainer) {
      observer.observe(currentContainer)
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Extract all users from all pages
  const allUsers = data?.pages.flatMap((page) => page.users) || []

    const handleUserClick = (user: any) => {
        const params = new URLSearchParams(window.location.search);
        params.set("recepientId", user.id!);
        window.history.replaceState({}, "", `?${params.toString()}`);
    }

  return (
    <div className="space-y-2">
      <SearchBar
        placeholder="Search users..."
        value={searchQuery}
        onChange={(value: string) => setSearchQuery(value)}
      />

      {isError && (
        <div className="p-4 text-red-500">
          Error loading users: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}

      <div className="max-h-60 overflow-y-auto">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2 border-b">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))
        ) : (
          <>
            {allUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No users found</div>
            ) : (
              allUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <Avatar>
                    <AvatarImage src={user.profile?.profilePicture || user.image || undefined} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))
            )}

            {/* Loading indicator and intersection observer target */}
            <div ref={containerRef} className="h-4">
              {isFetchingNextPage && (
                <div className="py-2 text-center text-sm text-gray-500">Loading more users...</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NewChatSearch

