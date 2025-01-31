import axios from "axios";

export const getCars = async (filters) => {
  const res = await axios.get("/api/cars/search", { params: filters });
  return res.data;
};
