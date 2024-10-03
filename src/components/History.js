import React, { useState } from "react";

export const History = ({ onSearch, history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchTermClick = (term) => {
    if (onSearch) {
      onSearch(term); // Trigger the onSearch function with the clicked term
      setIsOpen(false); // Close the history dropdown after clicking
    }
  };

  return (
    <div className="relative ml-auto">
      {" "}
      {/* Align the button to the right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
      >
        History
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10">
          <ul className="py-2">
            {/* Display the passed history items */}
            {history.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSearchTermClick(item)} // Call the click handler
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
