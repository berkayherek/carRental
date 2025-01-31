import React, { createContext, useState, useEffect } from "react";
import { login, logout as logoutUser } from "../services/authService";


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
      if (response.token) {
        const userData = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store user only
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials"); // ✅ Handle login errors properly
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
