// frontend/src/api.js
import axios from "axios";

const API_URL = "https://search-engine-server-27aw.onrender.com/api"; // Use the environment variable

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the Authorization header using interceptors
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API call for user login
export const login = async (email, password) => {
  try {
    const response = await api.post("/user/login", { email, password });
    const { token } = response.data;

    // Store the token in localStorage
    localStorage.setItem("token", token);
    console.log("Token stored in localStorage:", token); // Debugging line

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call for user registration
export const register = async (name, email, password) => {
  try {
    const response = await api.post("/user/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call for user logout
export const logout = async () => {
  try {
    const response = await api.post("/user/logout");
    console.log("Successfully logged out:", response.data);

    // Remove token from local storage
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error.response?.data);

    if (error.response?.status === 401) {
      // Handle 401 Unauthorized errors (token expiration, etc.)
      console.warn("Token might be expired. Clearing local storage.");
      localStorage.removeItem("token");
    }
  }
};

// API call for search functionality
export const search = async (query) => {
  try {
    const response = await api.post("/search/search", { query });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call for adding search to history
export const addSearchToHistory = async (searchTerm) => {
  try {
    const response = await api.post("/search/history", { searchTerm });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call for retrieving search history
export const getSearchHistory = async () => {
  try {
    const response = await api.get("/search/history");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Utility function to set the auth token in headers
export const setAuthToken = (token) => {
  if (token) {
    // Set the token in Authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Remove Authorization header if no token
    delete axios.defaults.headers.common["Authorization"];
  }
};
