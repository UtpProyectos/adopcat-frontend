import React from "react";
import { Input } from "@heroui/react"; 
import SearchIcon from "../IconsSvg/SearchIcon";

interface SearchBarProps {
  filterValue: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ filterValue, onSearchChange, onClear }) => {
  return (
    <Input
      isClearable
      placeholder="Search by name..."
      startContent={<SearchIcon />}
      value={filterValue}
      onClear={onClear}
      onValueChange={onSearchChange}
    />
  );
};

export default SearchBar;
