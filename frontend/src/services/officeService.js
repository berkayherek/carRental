import axios from "axios";

const API_URL = "http://localhost:5000/api/rental-offices"; // Adjust as needed

export const fetchRentalOffices = async (lat, lng) => {
    try {
        const response = await axios.get(`${API_URL}?lat=${lat}&lng=${lng}`);
        return response.data; // Ensure the backend returns an array
    } catch (error) {
        console.error("Error fetching rental offices:", error);
        return [];
    }
};
