const { databases, DATABASE_ID, COLLECTION_OFFICES } = require("../config/appwrite");

const getNearestOffices = async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and longitude are required." });
        }

        console.log("📡 Fetching offices near:", latitude, longitude);

        // ✅ Fetch all offices from Appwrite (since Appwrite doesn't support geo-queries)
        const officeData = await databases.listDocuments(DATABASE_ID, COLLECTION_OFFICES);
        const offices = officeData.documents;

        if (!offices.length) {
            console.log("⚠️ No offices found in the database.");
            return res.json({ results: [] });
        }

        // ✅ Remove strict filtering and return all offices
        console.log("✅ Returning offices:", offices);
        res.json({ results: offices });
    } catch (error) {
        console.error("❌ Error fetching offices:", error);
        res.status(500).json({ error: "Failed to fetch rental offices.", details: error.message });
    }
};

module.exports = { getNearestOffices };
