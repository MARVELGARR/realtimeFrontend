"use client"

import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar"
import type { User } from "@/components/myComponents/utilityComponent/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import getSearchUsers from "@/actions/api-actions/userAction/getSearchUsers"
import { useInfiniteQuery } from "@tanstack/react-query"
import useDebounce from "@/hooks/utilityHooks/useDebounce"
import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface CreateNewGroupViewProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  users: User[]
  handleUserSelect: (userId: string) => void
  handleClearUsers: () => void
  handleNextInGroupCreation: () => void
}

export const CreateNewGroupView = ({
  searchQuery,
  setSearchQuery,
  users,
  handleUserSelect,
  handleClearUsers,
  handleNextInGroupCreation,
}: CreateNewGroupViewProps) => {
  const debouncedValue = useDebounce(searchQuery, 500)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showSearchResults, setShowSearchResults] = useState(false)

  // Query for searching additional users
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ["group-users", debouncedValue],
    queryFn: ({ pageParam }) => getSearchUsers(debouncedValue, String(pageParam), "5"),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.currentPage + 1
      }
      return undefined
    },
    enabled: debouncedValue.length > 0,
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

  // Show search results when typing, hide when empty
  useEffect(() => {
    setShowSearchResults(debouncedValue.length > 0)
  }, [debouncedValue])

  // Extract all users from all pages
  const searchResults = data?.pages.flatMap((page) => page.users) || []

  // Filter out users that are already selected
  const filteredSearchResults = searchResults.filter(
    (searchUser) => !users.some((selectedUser) => selectedUser.id === searchUser.id),
  )

  // Handle adding a user from search results
  const handleAddUser = (user: any) => {
    // Create a user object in the format expected by the parent component
    const newUser: User = {
      id: user.id,
      name: user.name,
      selected: true,
    }

    // Add to selected users if not already present
    if (!users.some((u) => u.id === user.id)) {
      handleUserSelect(newUser.id)
      // Add the new user to the users array
      users.push(newUser)
    }

    // Clear search
    setSearchQuery("")
    setShowSearchResults(false)
  }

  const selectedUsers = users.filter((user) => user.selected)
  const canProceed = selectedUsers.length >= 2

  return (
    <div className="p-2 space-y-4">
      <div className="space-y-2">
        <SearchBar placeholder="Search for people..." value={searchQuery} onChange={setSearchQuery} />

        {/* Search Results */}
        {showSearchResults && (
          <div className="border rounded-md max-h-60 overflow-y-auto">
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
            ) : filteredSearchResults.length > 0 ? (
              <>
                {filteredSearchResults.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
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
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div ref={containerRef} className="h-4">
                  {isFetchingNextPage && <div className="py-2 text-center text-xs text-gray-500">Loading more...</div>}
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                {isError ? "Error loading users" : "No users found"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Users */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Selected Participants ({selectedUsers.length})</h3>
          {selectedUsers.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearUsers} className="h-8 text-xs">
              Clear All
            </Button>
          )}
        </div>

        <ScrollArea className="h-40 border rounded-md p-2">
          {selectedUsers.length === 0 ? (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">No users selected</div>
          ) : (
            <div className="space-y-2">
              {selectedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUserSelect(user.id)}
                    className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      <Button onClick={handleNextInGroupCreation} disabled={!canProceed} className="w-full">
        Next
      </Button>
      {!canProceed && selectedUsers.length > 0 && (
        <p className="text-xs text-center text-amber-600">Select at least 2 participants to create a group</p>
      )}
    </div>
  )
}

