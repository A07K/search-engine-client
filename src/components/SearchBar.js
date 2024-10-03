import React, { useState } from "react";

export const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <input
        type="text"
        value={searchQuery} // Use the searchQuery prop as value
        onChange={(e) => setSearchQuery(e.target.value)} // Update the state on change
        className="border border-gray-300 rounded p-2 w-full"
        placeholder="Search..."
      />
    </form>
  );
};
