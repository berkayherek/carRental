const { Client, Databases, ID } = require("node-appwrite");
require("dotenv").config();

// ✅ Initialize Appwrite Client
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT) 
    .setProject(process.env.APPWRITE_PROJECT_ID) 
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

// ✅ Load environment variables
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_CARS = process.env.APPWRITE_COLLECTION_CARS;
const COLLECTION_USERS = process.env.APPWRITE_COLLECTION_USERS;
const COLLECTION_BOOKINGS = process.env.APPWRITE_COLLECTION_BOOKINGS;
const COLLECTION_OFFICES = process.env.APPWRITE_COLLECTION_OFFICES;

// ✅ Debugging: Check if environment variables are loaded correctly
console.log("🚀 APPWRITE_ENDPOINT:", process.env.APPWRITE_ENDPOINT);
console.log("🚀 APPWRITE_PROJECT_ID:", process.env.APPWRITE_PROJECT_ID);
console.log("🚀 APPWRITE_DATABASE_ID:", DATABASE_ID);
console.log("🚀 APPWRITE_COLLECTION_CARS:", COLLECTION_CARS);
console.log("🚀 APPWRITE_COLLECTION_USERS:", COLLECTION_USERS);
console.log("🚀 APPWRITE_COLLECTION_BOOKINGS:", COLLECTION_BOOKINGS);
console.log("🚀 APPWRITE_COLLECTION_OFFICES:", COLLECTION_OFFICES);

if (!DATABASE_ID || !COLLECTION_CARS || !COLLECTION_USERS || !COLLECTION_BOOKINGS || !COLLECTION_OFFICES) {
    console.error("❌ ERROR: One or more Appwrite environment variables are missing.");
}

module.exports = { databases, DATABASE_ID, COLLECTION_CARS, COLLECTION_USERS, COLLECTION_BOOKINGS, COLLECTION_OFFICES, ID };
