import axios from "axios";

const API_URL = "https://carrental-zbtl.onrender.com/api/auth"; // Correct URL

exports.registerUser = async ({ email, password, name }) => {
  try {
    // ✅ Generate a valid user ID (max 36 characters)
    const userId = ID.unique(); 

    // ✅ Correct order of parameters: userId, email, password, name
    const user = await account.create(userId, email, password, name);
    return user;
  } catch (error) {
    console.error("Appwrite Registration Error:", error.message);
    throw new Error(error.message || "Registration failed");
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