import React from "react";

export const FilterButtons = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setActiveFilter("All")}
        className={`py-2 px-4 ${
          activeFilter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setActiveFilter("Videos")}
        className={`py-2 px-4 ${
          activeFilter === "Videos" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Videos
      </button>
      <button
        onClick={() => setActiveFilter("Articles")}
        className={`py-2 px-4 ${
          activeFilter === "Articles" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Articles
      </button>
      <button
        onClick={() => setActiveFilter("Blogs")}
        className={`py-2 px-4 ${
          activeFilter === "Blogs" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Blogs
      </button>
      <button
        onClick={() => setActiveFilter("Academic")} // Updated to use setActiveFilter
        className={`py-2 px-4 ${
          activeFilter === "Academic" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Academics
      </button>
    </div>
  );
};
