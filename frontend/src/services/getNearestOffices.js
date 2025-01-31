import axios from "axios";

export const getNearestOffices = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/offices?lat=${latitude}&lng=${longitude}`
    );
    return response.data.map((office) => ({
      ...office,
      distance: Math.random() * 30, // Replace with real distance calculation
    }));
  } catch (error) {
    console.error("Error fetching nearest offices:", error);
    return [];
  }
};
