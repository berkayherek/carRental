import axios from "axios";

const API_URL = "https://carrental-zbtl.onrender.com//api/auth"; // Adjust to match backend URL

export const register = async (email, password, name) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password, name });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Returns `{ session, user }`
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

export const getUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem("user");
  } catch (error) {
    throw new Error("Logout failed");
  }
};
