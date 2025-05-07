import { FC } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
  className?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onFilterClick,
  className = "",
}) => {
  return (
    <div className={`flex items-center border rounded-lg px-3 py-2 gap-2 bg-white ${className}`}>
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        className="flex-1 outline-none text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

        <button
          onClick={onFilterClick}
          className="text-gray-600 cursor-pointer hover:text-black"
          aria-label="Filter"
        >
          <FiFilter size={18} />
        </button>
      
    </div>
  );
};

export default SearchBar;
