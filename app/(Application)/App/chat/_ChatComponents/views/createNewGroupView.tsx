"use client"

import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar"
import type { User } from "@/components/myComponents/utilityComponent/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, UserPlus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import getSearchUsers from "@/actions/api-actions/userAction/getSearchUsers"
import { useInfiniteQuery } from "@tanstack/react-query"
import useDebounce from "@/hooks/utilityHooks/useDebounce"
import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { userSelectionType, useUserSelection } from "@/store/useUserSelection"

interface CreateNewGroupViewProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleNextInGroupCreation: () => void
}

export const CreateNewGroupView = ({
  searchQuery,
  setSearchQuery,
  handleNextInGroupCreation,
}: CreateNewGroupViewProps) => {
  const debouncedValue = useDebounce(searchQuery, 500)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showSearchResults, setShowSearchResults] = useState(false)

  // Fetch search results with infinite scrolling
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ["group-users", debouncedValue],
    queryFn: ({ pageParam }) => getSearchUsers(debouncedValue, String(pageParam), "5"),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.pagination.hasNextPage ? lastPage.pagination.currentPage + 1 : undefined),
    enabled: !!debouncedValue,
  })

  const {clearUserSelections,removeUserSelections,setUserSelections,userSelections} = useUserSelection()

  useEffect(() => {
    if (!debouncedValue) {
      setShowSearchResults(false)
      return
    }
    setShowSearchResults(true)
  }, [debouncedValue])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.5 },
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const searchResults = data?.pages.flatMap((page) => page.users) || []

  
  const filteredSearchResults = searchResults.filter(
    (searchUser) => !userSelections.some((selectedUser) => selectedUser.id === searchUser.id),
  )

  // Handle adding a user from search results
  const handleAddUser = (user: userSelectionType) => {

    setUserSelections(user)  
    
    
  }

  // Check if we have enough users to proceed
  const canProceed = userSelections.length >= 2

  return (
    <div className="p-2 space-y-4">
      <SearchBar placeholder="Search for people..." value={searchQuery} onChange={setSearchQuery} />

      {/* Selected users count badge */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="px-2 py-1">
          {userSelections.length} selected
        </Badge>
        {userSelections.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearUserSelections}
            className="h-8 text-xs text-destructive hover:text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Search results */}
      {showSearchResults && (
        <div className="border rounded-md max-h-60 overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2 border-b">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))
          ) : filteredSearchResults.length > 0 ? (
            filteredSearchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => handleAddUser(user)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profile?.profilePicture || user.image || undefined} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-primary">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              {isError ? "Error loading users" : "No users found"}
            </div>
          )}
          <div ref={containerRef} className="h-4">
            {isFetchingNextPage && <div className="py-2 text-center text-xs text-gray-500">Loading more...</div>}
          </div>
        </div>
      )}

      {/* Selected users list */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Selected Participants</h3>
        <ScrollArea className="h-40 border rounded-md p-2">
          {userSelections.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-sm text-gray-500">
              <UserPlus className="h-8 w-8 mb-2 text-gray-400" />
              <p>No users selected</p>
              <p className="text-xs">Search and add participants above</p>
            </div>
          ) : (
            <div className="space-y-2">
              {userSelections.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image! || user.profile?.profilePicture!} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUserSelections(user)}
                    className="h-6 w-6 p-0 text-gray-500 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Next button */}
      <Button onClick={handleNextInGroupCreation} disabled={!canProceed} className="w-full">
        Next
      </Button>

      {/* Validation message */}
      {!canProceed && userSelections.length > 0 && (
        <p className="text-xs text-center text-amber-600">Select at least 2 participants to create a group</p>
      )}
    </div>
  )
}

