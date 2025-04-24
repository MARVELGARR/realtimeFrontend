"use client"

import { useEffect, useState } from "react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"

type FavoriteItem = {
  id: string
  name: string
  image?: string
  lastSeen?: string
}

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [loading, setLoading] = useState(true)

  const BaseUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://realtime-frontend-olive.vercel.app"

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${BaseUrl}/api/favorites`)
        if (response.ok) {
          const data = await response.json()
          setFavorites(data)
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error)
        // Fallback data in case the API fails
        setFavorites([
          { id: "1", name: "John Doe", image: "/placeholder.svg?height=40&width=40" },
          { id: "2", name: "Jane Smith", image: "/placeholder.svg?height=40&width=40" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [BaseUrl])

  if (loading) {
    return (
      <DropdownMenuItem disabled className="flex justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2">Loading favorites...</span>
      </DropdownMenuItem>
    )
  }

  if (favorites.length === 0) {
    return <DropdownMenuItem disabled>No favorites found</DropdownMenuItem>
  }

  return (
    <>
      {favorites.map((favorite) => (
        <DropdownMenuItem key={favorite.id} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={favorite.image || "/placeholder.svg"} alt={favorite.name} />
              <AvatarFallback>{favorite.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{favorite.name}</span>
          </div>
        </DropdownMenuItem>
      ))}
    </>
  )
}
