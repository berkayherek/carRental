import axios from "axios";

export const bookCar = async (bookingData) => {
  const res = await axios.post("/api/bookings", bookingData);
  return res.data;
};

export const getUserBookings = async (userId) => {
  const res = await axios.get(`/api/bookings/user/${userId}`);
  return res.data;
};
