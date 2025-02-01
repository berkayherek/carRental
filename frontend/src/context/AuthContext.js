import React, { createContext, useState, useEffect } from "react";
import { login as loginUser, logout as logoutUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Handle login
  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      if (response.session && response.user) {
        const userData = {
          id: response.user.id,
          email: response.user.email,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", response.session.$id); // Store session ID
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  };

  // ✅ Handle logout
  const logout = () => {
    logoutUser();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};