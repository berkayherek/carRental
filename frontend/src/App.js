import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ No BrowserRouter here
import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";
import Register from "./pages/register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
