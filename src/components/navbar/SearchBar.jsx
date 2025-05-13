//src/components/navbar/SearchBar.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

const categories = [
  "Seasonal Collection",
  "Occasion Based",
  "Style Based",
  "Special Collection",
  "Casual Wears",
  "Sports & Activewear",
  "Traditional Wear",
];

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center w-full rounded-[5px] overflow-hidden" ref={dropdownRef}>
      {/* Dropdown */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center px-4 py-3 bg-[#767676] text-white text-sm font-medium hover:bg-[#7A7A7A] focus:outline-none h-full rounded-bl-[5px] rounded-tl-[5px] whitespace-nowrap"
        >
          {selectedCategory}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Search your dress here....."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full min-w-0 bg-[#E0D7CC] px-4 py-[9px] placeholder:text-sm text-[#2a2a2a] placeholder-[#7a7a7a] focus:outline-none"
      />

      {/* Search Button */}
      <button className="flex-shrink-0 px-4 py-3 bg-[#B8A38A] hover:bg-[#a28d73] h-full rounded-br-[5px] rounded-tr-[5px]">
        <Search className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}