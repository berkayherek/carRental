import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings"; // Adjust if needed

// ✅ Ensure the function is correctly named and exported
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/`, bookingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Booking failed");
  }
};

// ✅ Fetch user bookings
export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch bookings");
  }
};
