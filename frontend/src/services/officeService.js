import axios from "axios";

const API_URL = "http://localhost:5000/api/offices";

export const getNearestOffices = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${API_URL}?lat=${latitude}&lng=${longitude}`);
        console.log("📡 API Response:", response.data);

        return response.data.results?.map((office) => ({
            ...office,
            distance: getDistance(latitude, longitude, office.latitude, office.longitude),
        })) || [];
    } catch (error) {
        console.error("Error fetching rental offices:", error);
        return [];
    }
};

// ✅ Ensure `useEffect` is NOT used in this service file.
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
