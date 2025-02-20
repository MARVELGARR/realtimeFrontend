import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"

interface SearchPhoneViewProps {
  phoneNumber: string
  setPhoneNumber: (value: string) => void
}

export const SearchPhoneView: React.FC<SearchPhoneViewProps> = ({ phoneNumber, setPhoneNumber }) => {
  return (
    <>
      <div className="px-2 py-2">
        <div className="flex items-center px-2 rounded-md border">
            
          <Phone className="h-4 w-4 text-muted-foreground" />
          <Input
            type="tel"
            placeholder="Enter phone number..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="h-8 w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => setPhoneNumber(phoneNumber + num)}
            className="h-10 w-10"
          >
            {num}
          </Button>
        ))}
      </div>
    </>
  )
}

