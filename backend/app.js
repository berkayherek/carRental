const { Client, Databases, ID } = require("node-appwrite");

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT) 
    .setProject(process.env.APPWRITE_PROJECT_ID) 
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_CARS = process.env.APPWRITE_COLLECTION_CARS;

if (!DATABASE_ID || !COLLECTION_CARS) {
    console.error("❌ DATABASE_ID or COLLECTION_CARS is missing from environment variables.");
}

module.exports = { databases, DATABASE_ID, COLLECTION_CARS, ID };
