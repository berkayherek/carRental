import axios from "axios";

export const getNearestOffices = async (latitude, longitude) => {
  const res = await axios.get(`/api/offices/nearby?lat=${latitude}&lng=${longitude}`);
  return res.data;
};
