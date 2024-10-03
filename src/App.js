// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage"; // Adjust path if necessary
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // Import the LoginPage component

const App = () => {
  return (
    <Router>
      {" "}
      {/* Wrapping the Routes with Router */}
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
