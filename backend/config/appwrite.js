const { Client, Databases, Users, ID } = require("node-appwrite");
require("dotenv").config();

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Load from .env
  .setProject(process.env.APPWRITE_PROJECT_ID) // Load from .env
  .setKey(process.env.APPWRITE_API_KEY); // Load from .env

const databases = new Databases(client);
const users = new Users(client); // ✅ Ensure `users` is correctly initialized

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_USERS = process.env.APPWRITE_COLLECTION_USERS;

module.exports = { databases, users, DATABASE_ID, COLLECTION_USERS, ID };
