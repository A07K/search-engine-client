import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { ResultList } from "../components/ResultList";
import { FilterButtons } from "../components/FilterButtons";
import { History } from "../components/History";
import {
  logout,
  search,
  addSearchToHistory,
  setAuthToken,
  getSearchHistory,
} from "../services/api";

const SearchPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]); // Track search history
  const navigate = useNavigate();

  // Fetch and update the search history
  const fetchHistory = async () => {
    try {
      const data = await getSearchHistory();
      const uniqueHistory = [...new Set(data)];
      setHistory(uniqueHistory);
    } catch (error) {
      console.error("Error fetching search history:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    }

    // Fetch the history only if the user is logged in
    if (isLoggedIn) {
      fetchHistory();
    }
  }, [isLoggedIn]);

  const handleSearch = async (query) => {
    try {
      setError(null);
      setSearchQuery(query); // Update the searchQuery state when a search is performed
      const results = await search(query);
      setSearchResults(results);

      if (isLoggedIn) {
        await addSearchToHistory(query);
        // Re-fetch history after adding a new search term to the history
        await fetchHistory();
      }
    } catch (error) {
      setError("An error occurred while searching. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please sign in again.");
      }
      setAuthToken(token);
      await logout();
      setAuthToken(null);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      setError("Error logging out. Please try again.");
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Background color applied to the entire main container */}
      <div className="bg-blue-100 p-4">
        {/* Header section with search bar and buttons */}
        <div className="flex items-center justify-between mb-4">
          {/* Search bar and buttons in a single row */}
          <div className="flex items-center space-x-4 w-full">
            <div className="flex-grow">
              <SearchBar
                onSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            {/* Adjusted button container for single-line display */}
            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-green-500 text-white px-4 py-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-blue-500 text-white px-4 py-2"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Pass setActiveFilter as the correct prop */}
        <div className="flex items-center justify-between">
          <FilterButtons
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          {/* Align the History button to the right, at the same level as filter buttons */}
          {isLoggedIn && <History onSearch={handleSearch} history={history} />}
        </div>
      </div>
      {/* Display Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {/* Result List Section */}
      <ResultList results={searchResults} activeFilter={activeFilter} />
    </div>
  );
};

export default SearchPage;
