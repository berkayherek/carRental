import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
  return res.data;
};
export const logoutUser = () => {
  localStorage.removeItem("user");
};
