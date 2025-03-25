import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type DisappearingSelectionProp ={
    className?: string;
    onValueChange: (value: string) => void;
    defaultValue: string
}
export function DisappearingSelection({className, defaultValue,  onValueChange}: DisappearingSelectionProp) {

    const DisappearingMessages =[ "OFF", "DAYS90", 'DAYS7', "H24"]


  return (
    <div className="flex items-center space-x-2">
            <Select defaultValue={defaultValue} onValueChange={onValueChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Disappearing Messages</SelectLabel>
                  {DisappearingMessages.map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
  )
}
