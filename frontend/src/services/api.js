import axios from "axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("/api/auth/login", { email, password });
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
