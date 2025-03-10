"use client";

import getSearchUsers from "@/actions/api-actions/userAction/getSearchUsers";
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar";
import useDebounce from "@/hooks/utilityHooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

const NewChatSearch = ({ initialSearch }: { initialSearch: any }) => {
  const [users, setUsers] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const debouncedValue = useDebounce(searchQuery, 500);

  const loadMoreUsers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    const {data: newUsers, isLoading: isGettingUsers} = useQuery({
        queryKey: ["user", {debouncedValue, nextPage}],
        queryFn: ()=> getSearchUsers(debouncedValue, nextPage.toString(), "5")
    })

    if (newUsers.length === 0) {
      setHasMore(false);
    } else {
      setUsers((prev: any) => [...prev, ...newUsers]);
      setPage(nextPage);
    }
    setLoading(false);
  };

  // Infinite scroll logic
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMoreUsers();
    }
  };

  useEffect(() => {
    setUsers(initialSearch); // Reset when search changes
    setPage(1);
    setHasMore(true);
  }, [debouncedValue]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <SearchBar
        placeholder="Search users..."
        value={searchQuery}
        onChange={(value: string) => setSearchQuery(value)}
      />
      <div>
        {users.map((user: any) => (
          <div key={user.id} className="p-2 border-b">
            {user.name}
          </div>
        ))}
        {loading && <p>Loading more users...</p>}
        {!hasMore && <p>No more users to load!</p>}
      </div>
    </div>
  );
};

export default NewChatSearch;
