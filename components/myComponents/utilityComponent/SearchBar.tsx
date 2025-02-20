import type React from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full pl-3 pr-10 rounded-md border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{
          borderBottom: "2px solid #22c55e", // Tailwind green-500 color
        }}
      />
      <Search className="h-4 w-4 text-muted-foreground absolute right-3 top-1/2 transform -translate-y-1/2" />
    </div>
  )
}

