export type UserSearchResponse = {
    users: {
      id: string | number
      name: string
      email: string
      image: string | null
      profile: {
        phoneNumber: string | null
        profilePicture: string | null
        gender: string | null
        bio: string | null
        blockedBy: any[]
      } | null
    }[]
    pagination: {
      currentPage: number
      totalPages: number
      hasNextPage: boolean
    }
  }
  
  const getSearchUsers = async (search = "", page = "1", limit = "5"): Promise<UserSearchResponse> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/searchUsers?search=${search}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        },
      )
  
      if (res.ok) {
        const data = await res.json()
        return data
      } else {
        const errorDetails = await res.json()
        throw new Error(`Failed to fetch users: ${JSON.stringify(errorDetails)}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching users: ${error.message}`)
      }
      throw new Error("Unknown error occurred while fetching users")
    }
  }
  
  export default getSearchUsers
  
  