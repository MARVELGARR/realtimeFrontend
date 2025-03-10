import { MenuItem } from "@/components/myComponents/utilityComponent/types";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface MainViewProps {
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
}
const PhoneAndGroup = ({ items, onItemClick }:MainViewProps) => {

    return (
        <>
          {items.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onSelect={(event) => {
                event.preventDefault()
                onItemClick(item)
              }}
              className="py-3 cursor-pointer"
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ))}
        </>
    );
}
 
export default PhoneAndGroup;