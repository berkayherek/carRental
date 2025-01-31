import axios from "axios";

const API_URL = "https://carrental-zbtl.onrender.com//api/offices";

export const getNearestOffices = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${API_URL}?lat=${latitude}&lng=${longitude}`);
        console.log("📡 API Response:", response.data); // ✅ Debugging Log

        if (!response.data.results) {
            console.log("⚠️ API did not return `results`. Check backend response.");
            return [];
        }

        return response.data.results.map((office) => ({
            ...office,
            distance: getDistance(latitude, longitude, office.latitude, office.longitude),
        }));
    } catch (error) {
        console.error("Error fetching rental offices:", error);
        return [];
    }
};

// ✅ Distance Calculation (Haversine Formula)
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
